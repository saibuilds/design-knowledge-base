# Astro

## What Astro Is For

Astro is a **content-first** web framework that ships zero JavaScript by default. Ideal for:
- Blogs, documentation sites
- Marketing/landing pages
- Portfolios
- Any site where content > interactivity

Ships static HTML at build time. Interactive components hydrate only when needed (islands architecture).

---

## Getting Started

```bash
npx create astro@latest my-site
cd my-site
npm run dev      # http://localhost:4321
npm run build    # builds to ./dist
npm run preview  # preview production build
```

### Starter templates
```bash
npx create astro@latest --template blog
npx create astro@latest --template portfolio
npx create astro@latest --template minimal
npx create astro@latest --template with-tailwind
npx create astro@latest --template with-react
```

---

## .astro File Structure

```astro
---
// Frontmatter — runs on server at build time (Node.js)
import Layout from "@/layouts/Layout.astro";
import Card from "@/components/Card.astro";

const title = "My Blog";
const posts = await fetch("https://api.example.com/posts").then(r => r.json());
---

<!-- Template — plain HTML + Astro expressions -->
<Layout title={title}>
  <h1>{title}</h1>

  {posts.map(post => (
    <Card href={`/posts/${post.slug}`} title={post.title} />
  ))}
</Layout>

<style>
  /* Scoped CSS — only applies to this component */
  h1 {
    font-size: 2rem;
    color: var(--color-heading);
  }
</style>
```

### Frontmatter rules
- Runs only at **build time** (or per-request with SSR)
- Can use `await`, `fetch`, fs, env vars
- Variables are passed to template via normal JS scope
- Imports work like ESM

### Props
```astro
---
// src/components/Card.astro
interface Props {
  title: string;
  href: string;
  description?: string;
}

const { title, href, description = "No description" } = Astro.props;
---

<a href={href} class="card">
  <h2>{title}</h2>
  <p>{description}</p>
</a>

<style>
  .card {
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
  }
</style>
```

### Dynamic routes
```astro
---
// src/pages/posts/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

---

## React / Vue / Svelte Islands

Install integrations:
```bash
npx astro add react        # adds @astrojs/react
npx astro add vue
npx astro add svelte
npx astro add solid
```

### astro.config.mjs
```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [react(), vue()],
});
```

### Using React in .astro
```astro
---
import Counter from "@/components/Counter.tsx";
import SearchBar from "@/components/SearchBar.tsx";
---

<!-- Static by default — renders HTML, no JS -->
<Counter />

<!-- client:load — hydrate immediately on page load -->
<Counter client:load />

<!-- client:idle — hydrate when browser is idle -->
<SearchBar client:idle />

<!-- client:visible — hydrate when scrolled into view -->
<HeavyWidget client:visible />

<!-- client:media — hydrate based on media query -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- client:only — skip SSR, render client-side only -->
<ThreeScene client:only="react" />
```

### React component (works normally)
```tsx
// src/components/Counter.tsx
import { useState } from "react";

export default function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

---

## Content Collections

Typed, validated markdown/MDX with Zod schemas.

### Define collection schema
```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default("Anonymous"),
    tags: z.array(z.string()).default([]),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  type: "data", // JSON/YAML
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
  }),
});

export const collections = { blog, team };
```

### Markdown file
```md
---
title: "Getting Started with Astro"
pubDate: 2024-01-15
description: "Learn how to build fast websites with Astro"
author: "Jane Doe"
tags: ["astro", "web", "tutorial"]
---

# Getting Started with Astro

Your content here...
```

### Query collections
```astro
---
import { getCollection, getEntry } from "astro:content";

// All posts, not drafts, sorted newest first
const posts = (await getCollection("blog", ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

// Single entry
const post = await getEntry("blog", "getting-started-with-astro");
const { Content, headings } = await post.render();
---

<ul>
  {posts.map(post => (
    <li>
      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
      <time>{post.data.pubDate.toLocaleDateString()}</time>
    </li>
  ))}
</ul>
```

---

## Built-in Image Optimization

```bash
# Already built in — no install needed
```

```astro
---
import { Image, Picture } from "astro:assets";
import heroImage from "@/assets/hero.jpg";
---

<!-- Optimized local image — auto width/height, WebP output -->
<Image src={heroImage} alt="Hero" />

<!-- Explicit sizing -->
<Image src={heroImage} alt="Hero" width={800} height={400} />

<!-- Art direction with Picture -->
<Picture
  src={heroImage}
  formats={["avif", "webp"]}
  alt="Hero"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 800px"
/>

<!-- Remote image (must add to domains) -->
<Image
  src="https://images.unsplash.com/photo-xyz"
  alt="Remote"
  width={600}
  height={400}
  inferSize
/>
```

### astro.config.mjs for remote images
```js
export default defineConfig({
  image: {
    domains: ["images.unsplash.com", "cdn.sanity.io"],
    remotePatterns: [{ protocol: "https", hostname: "**.cloudinary.com" }],
  },
});
```

---

## Astro + Tailwind Setup

```bash
npx astro add tailwind
```

This auto-creates `tailwind.config.mjs` and patches `astro.config.mjs`.

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // disable if you manage @layer base yourself
    }),
  ],
});
```

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: theme(colors.violet.600);
  }

  body {
    @apply antialiased text-gray-900;
  }
}
```

```astro
---
// src/layouts/Layout.astro
import "@/styles/global.css";
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{Astro.props.title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## Astro vs Next.js vs Vite

| Criteria                      | Astro            | Next.js          | Vite (React SPA) |
|-------------------------------|------------------|------------------|------------------|
| Content-heavy sites           | Best             | Good             | Poor             |
| Blog / docs / marketing       | Best             | Good             | Avoid            |
| Full-stack app (auth, DB)     | Possible         | Best             | Poor             |
| Dashboard / admin             | Avoid            | Best             | Good             |
| E-commerce                    | Good             | Best             | Poor             |
| Portfolio site                | Best             | Good             | OK               |
| Page load speed               | Fastest          | Fast             | Slow (SPA)       |
| SEO out of the box            | Best             | Best             | Needs config     |
| JS bundle size                | ~0 by default    | Medium           | Large            |
| Learning curve                | Low-Medium       | Medium           | Low              |
| React integration             | Islands only     | Full             | Full             |
| API routes                    | Yes (endpoints)  | Yes (Route Handlers) | No (Vite only) |
| Streaming / RSC               | Limited          | Full (App Router)| No               |
| CMS integration               | Excellent        | Excellent        | OK               |

### Decision guide

**Use Astro when:**
- The site is mostly static content (blog, portfolio, landing page, docs)
- SEO and performance are top priorities
- You want to mix framework components (React + Vue in same project)
- You want minimal JS shipped

**Use Next.js when:**
- You need auth, sessions, or server-side logic
- Building a full product (dashboard, SaaS, e-commerce)
- You need React Server Components / streaming
- Team is already in the React ecosystem

**Use Vite (React SPA) when:**
- Building a client-only app (no SEO needed)
- Internal tool, dashboard behind auth
- You want maximum simplicity
- Rapid prototyping

---

## SSR Mode (on-demand rendering)

```bash
npx astro add node      # Node.js adapter
npx astro add vercel    # Vercel adapter
npx astro add cloudflare # Cloudflare adapter
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",   // "static" | "server" | "hybrid"
  adapter: vercel(),
});
```

```astro
---
// With output: "hybrid", opt pages in/out
export const prerender = false; // this page is SSR
// export const prerender = true; // this page is static
---
```

---

## Astro API Endpoints

```ts
// src/pages/api/posts.json.ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ url }) => {
  const tag = url.searchParams.get("tag");
  let posts = await getCollection("blog");

  if (tag) {
    posts = posts.filter(p => p.data.tags.includes(tag));
  }

  return new Response(
    JSON.stringify(posts.map(p => ({ slug: p.slug, ...p.data }))),
    { headers: { "Content-Type": "application/json" } }
  );
};
```
