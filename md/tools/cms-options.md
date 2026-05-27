# CMS Options

## Overview

| CMS        | Hosting        | Free Tier         | API          | Best For                        |
|------------|----------------|-------------------|--------------|---------------------------------|
| Sanity     | Cloud          | 3 users, 10GB     | GROQ / CDN   | Structured content, custom schemas |
| Contentful | Cloud          | 25k records, 2 users | REST + GraphQL | Enterprise, large teams      |
| Strapi     | Self-hosted    | Open source / free | REST + GraphQL | Full control, custom APIs    |
| Prismic    | Cloud          | 1 user, unlimited pages | REST   | Page builder, slice-based      |
| Notion     | Cloud (Notion) | Personal free     | REST         | Internal tools, simple blogs   |
| Directus   | Self-hosted    | Open source / free | REST + GraphQL | Power users, complex data    |

---

## Sanity.io

### Setup
```bash
npm create sanity@latest -- --template clean --create-project "My Project" --dataset production
cd my-sanity-studio
npm run dev   # Studio at http://localhost:3333
```

### Schema definition
```ts
// sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string" }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" }, // rich text
        { type: "image", options: { hotspot: true } },
        { type: "code" },  // requires @sanity/code-input
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
```

### GROQ queries
```ts
// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true, // false for draft content
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
```

```ts
// lib/queries.ts
import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt < now()]
  | order(publishedAt desc) [0...10] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "coverImage": coverImage { asset->, alt },
    "categories": categories[]->{ title, slug }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    "coverImage": coverImage { asset->, alt, caption },
    body[] {
      ...,
      _type == "image" => { asset->, alt }
    }
  }
`;
```

### Next.js integration
```tsx
// app/blog/page.tsx
import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/queries";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
```

### Portable Text (rich body)
```bash
npm install @portabletext/react
```

```tsx
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlFor(value).width(800).url()}
        alt={value.alt ?? ""}
        width={800}
        height={450}
        className="rounded-lg my-8"
      />
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener" className="text-primary-500 underline">
        {children}
      </a>
    ),
  },
};

export function PostBody({ body }: { body: any[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={body} components={ptComponents} />
    </div>
  );
}
```

---

## Contentful

### Setup
```bash
npm install contentful
```

```ts
// lib/contentful.ts
import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Preview client (for draft content)
export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: "preview.contentful.com",
});
```

### REST API queries
```ts
// Fetch all blog posts
const entries = await contentfulClient.getEntries({
  content_type: "blogPost",
  order: ["-fields.publishDate"],
  limit: 10,
  "fields.publishDate[lte]": new Date().toISOString(),
  include: 2, // resolve linked entries up to 2 levels deep
});

// Type your entries
interface BlogPost {
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    body: Document; // rich text
    featuredImage: Asset;
    tags: string[];
  };
}

const posts = entries.items as Entry<BlogPost>[];
```

### GraphQL API
```ts
const query = `
  query BlogPosts($limit: Int!, $skip: Int!) {
    blogPostCollection(limit: $limit, skip: $skip, order: publishDate_DESC) {
      total
      items {
        title
        slug
        publishDate
        excerpt
        featuredImage {
          url
          width
          height
          description
        }
        tagsCollection {
          items { title }
        }
      }
    }
  }
`;

const response = await fetch(
  `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { limit: 10, skip: 0 } }),
  }
);
```

---

## Strapi (Self-hosted)

### Setup
```bash
npx create-strapi-app@latest my-cms --quickstart
cd my-cms
npm run develop  # http://localhost:1337/admin
```

### Deploy to Railway/Render
```bash
# railway.app — one-click deploy
railway new strapi-cms
railway add postgresql
railway deploy
```

### REST API
```ts
// lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

async function strapiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.statusText}`);
  return res.json();
}

// Fetch posts with populate
export async function getPosts() {
  return strapiRequest<{ data: StrapiPost[] }>(
    "/posts?populate=coverImage,categories&sort=publishedAt:desc&pagination[pageSize]=10"
  );
}
```

### GraphQL API
```bash
npm install @strapi/plugin-graphql
```

```ts
const POSTS_QUERY = `
  query Posts($pagination: PaginationArg) {
    posts(pagination: $pagination, sort: "publishedAt:desc") {
      data {
        id
        attributes {
          title
          slug
          publishedAt
          excerpt
          coverImage {
            data {
              attributes { url alternativeText width height }
            }
          }
        }
      }
      meta {
        pagination { total pageCount }
      }
    }
  }
`;

const response = await fetch(`${STRAPI_URL}/graphql`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: POSTS_QUERY,
    variables: { pagination: { pageSize: 10, page: 1 } },
  }),
});
```

---

## Prismic

### Setup
```bash
npm install @prismicio/client @prismicio/next
npx @slicemachine/init@latest
```

### Slices (page builder components)
```ts
// slices/Hero/index.tsx
import { type Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText, PrismicImage } from "@prismicio/react";

type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  return (
    <section className="py-20 px-6">
      <PrismicImage field={slice.primary.background_image} className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <h1 className="text-display-lg font-bold text-white">{children}</h1>
            ),
          }}
        />
      </div>
    </section>
  );
}
```

### Page query
```ts
// app/[uid]/page.tsx
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default async function Page({ params }: { params: { uid: string } }) {
  const client = createClient();
  const page = await client.getByUID("page", params.uid);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");
  return pages.map(page => ({ uid: page.uid }));
}
```

---

## Notion as CMS

### Setup
```bash
npm install @notionhq/client notion-to-md
```

```ts
// lib/notion.ts
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getBlogPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_DB_ID!,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "Published Date", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text ?? "",
    slug: page.properties.Slug.rich_text[0]?.plain_text ?? "",
    publishedAt: page.properties["Published Date"].date?.start ?? "",
    tags: page.properties.Tags.multi_select.map((t: any) => t.name),
    cover: page.cover?.external?.url ?? page.cover?.file?.url ?? null,
  }));
}

export async function getPostContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdblocks);
}
```

### Limitations
- Rate limited (3 req/sec), use caching
- No real-time updates without webhooks
- Rich text rendering requires extra work
- Good for internal/personal projects, not production scale

---

## Directus (Self-hosted)

### Setup
```bash
npx directus bootstrap
npx directus start
# or Docker:
docker run -p 8055:8055 directus/directus
```

### REST API
```ts
// lib/directus.ts
import { createDirectus, rest, readItems, readItem } from "@directus/sdk";

interface Schema {
  posts: {
    id: number;
    title: string;
    slug: string;
    body: string;
    status: "published" | "draft";
    date_published: string;
    cover_image: string; // file UUID
  }[];
}

const directus = createDirectus<Schema>("https://cms.mysite.com").with(rest());

export async function getPosts() {
  return directus.request(
    readItems("posts", {
      filter: { status: { _eq: "published" } },
      sort: ["-date_published"],
      limit: 10,
      fields: ["id", "title", "slug", "date_published", "cover_image"],
    })
  );
}

// Image URLs
export function getDirectusImageUrl(fileId: string, params?: Record<string, string>) {
  const url = new URL(`https://cms.mysite.com/assets/${fileId}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return url.toString();
}

// Usage: getDirectusImageUrl(post.cover_image, { width: "800", format: "webp" })
```

---

## When to Use Each

| Scenario                                    | Recommended CMS     | Why                                          |
|---------------------------------------------|---------------------|----------------------------------------------|
| Agency building client sites                | Sanity              | Great DX, custom schemas, free tier          |
| Marketing site with non-dev editors         | Prismic             | Visual slice builder, easy for editors       |
| Blog / docs with structured content         | Sanity or Contentful| Strong schema validation, great APIs         |
| E-commerce with custom data                 | Strapi              | Full control, custom endpoints               |
| Internal tool / personal blog               | Notion              | Zero setup if team uses Notion               |
| Large enterprise / multi-brand              | Contentful          | Robust permissions, CDN, GraphQL             |
| Complex app with custom data model          | Directus            | Most flexible, SQL-native                    |
| Startup wanting to own all infrastructure   | Strapi or Directus  | Self-hosted, no vendor lock-in               |
| Client wants to edit pages visually         | Prismic or Builder.io| Slice zone / visual editor                  |

---

## Integration Patterns with Next.js

### Pattern 1: Static generation + ISR
```ts
// Best for: blog, marketing — fresh but fast
export const revalidate = 3600; // revalidate every hour

export default async function Page() {
  const posts = await fetchFromCMS();
  return <PostList posts={posts} />;
}
```

### Pattern 2: On-demand revalidation (webhook)
```ts
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const secret = request.headers.get("x-webhook-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  // Revalidate specific paths or tags
  if (body.type === "post") {
    revalidatePath("/blog");
    revalidatePath(`/blog/${body.slug}`);
    revalidateTag("posts");
  }

  return NextResponse.json({ revalidated: true });
}
```

### Pattern 3: Cached fetch with tags
```ts
async function getPosts() {
  const res = await fetch("https://api.sanity.io/v2024...", {
    next: {
      tags: ["posts"],
      revalidate: 3600,
    },
  });
  return res.json();
}

// Invalidate with: revalidateTag("posts")
```

### Pattern 4: Draft mode / preview
```ts
// app/api/draft/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  draftMode().enable();
  redirect(`/blog/${slug}`);
}

// In page component:
import { draftMode } from "next/headers";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();

  const post = isEnabled
    ? await fetchDraftPost(params.slug)   // fetch from CMS preview API
    : await fetchPublishedPost(params.slug);

  return <Article post={post} />;
}
```
