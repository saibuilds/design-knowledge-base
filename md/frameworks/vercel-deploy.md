# Vercel Deploy

## Deploying Vite + React to Vercel

### Setup
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### vercel.json for Vite
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploy Commands
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview URL
vercel

# Deploy to production
vercel --prod

# Link existing project
vercel link

# Pull env variables from Vercel
vercel env pull .env.local
```

---

## Deploying Next.js to Vercel

Zero-config. Push to GitHub → auto-detected.

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
vercel
```

### next.config.ts
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
```

---

## Environment Variables

### In Vercel Dashboard
Settings → Environment Variables → Add

Scopes: Production / Preview / Development

### In Code (Next.js)
```ts
// Server-side only (never exposed to browser)
const secret = process.env.DATABASE_URL;

// Exposed to browser (prefix NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### In Code (Vite)
```ts
// Exposed to browser (prefix VITE_)
const apiUrl = import.meta.env.VITE_API_URL;

// Server-side build-time only
const buildSecret = import.meta.env.SOME_SECRET; // NOT exposed
```

### .env files
```bash
.env                # all environments, committed
.env.local          # local override, gitignored
.env.production     # production only
.env.development    # dev only
```

### Pull from Vercel
```bash
vercel env pull .env.local          # development vars
vercel env pull --environment=production .env.production
```

---

## Custom Domains

### Via CLI
```bash
vercel domains add mydomain.com
vercel alias set my-deployment.vercel.app mydomain.com
```

### DNS Configuration
| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | @    | 76.76.21.21                  |
| CNAME | www  | cname.vercel-dns.com         |

### Subdomain
```bash
vercel domains add app.mydomain.com
# Add CNAME record: app → cname.vercel-dns.com
```

---

## Preview Deployments

Every push to a non-production branch gets a unique preview URL.

```bash
# Deploy feature branch to preview
git checkout -b feature/new-hero
git push origin feature/new-hero
# Vercel auto-deploys → https://my-app-git-feature-new-hero-yourteam.vercel.app
```

### Preview URL patterns
- Branch: `my-app-git-{branch}-{team}.vercel.app`
- Commit: `my-app-{commitHash}-{team}.vercel.app`

### Protect preview deployments
```json
// vercel.json
{
  "github": {
    "enabled": true,
    "autoAlias": true
  },
  "protectionBypass": {
    "secret-token": "bypass-for-automation"
  }
}
```

---

## Vercel Edge Functions for API Routes

### Next.js App Router Edge Route
```ts
// app/api/hello/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "World";

  return new Response(JSON.stringify({ message: `Hello ${name}` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
```

### Edge Middleware
```ts
// middleware.ts (runs on every request, globally)
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set("x-user-id", token.value);
  return response;
}
```

### Vercel Edge Function (standalone, /api/*)
```ts
// api/geo.ts (Vercel Functions format)
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = { runtime: "edge" };

export default function handler(req: VercelRequest, res: VercelResponse) {
  // @ts-ignore — available in edge runtime
  const { city, country } = req.geo ?? {};
  res.json({ city, country });
}
```

### When to use Edge vs Node runtime
| Use Case                    | Runtime  |
|-----------------------------|----------|
| Auth checks, redirects      | Edge     |
| Fast geo-aware responses    | Edge     |
| Database queries (Prisma)   | Node     |
| File system access          | Node     |
| Heavy computation           | Node     |

---

## Analytics Integration

### Vercel Analytics (built-in)
```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Vercel Speed Insights
```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Image Optimization via Vercel

### next/image (automatic)
```tsx
import Image from "next/image";

// Local image (auto width/height)
import heroImg from "@/public/hero.jpg";

export function Hero() {
  return (
    <Image
      src={heroImg}
      alt="Hero"
      priority          // preload LCP image
      placeholder="blur" // blur-up effect
      className="w-full h-auto"
    />
  );
}

// Remote image
export function Avatar({ url }: { url: string }) {
  return (
    <Image
      src={url}
      alt="Avatar"
      width={64}
      height={64}
      sizes="64px"
      className="rounded-full"
    />
  );
}
```

### Responsive sizes attribute
```tsx
<Image
  src={photo}
  alt="Photo"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

### Format delivery
Vercel auto-serves WebP/AVIF based on `Accept` header. No config needed.

### Image optimization config
```ts
// next.config.ts
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};
```

---

## CLI Reference

```bash
vercel                          # deploy to preview
vercel --prod                   # deploy to production
vercel dev                      # local dev with Vercel env
vercel env list                 # list env vars
vercel env add NAME             # add env var interactively
vercel env pull .env.local      # pull dev env vars
vercel logs my-deployment-url   # stream logs
vercel inspect my-deployment    # deployment details
vercel rollback                 # roll back to previous deployment
vercel domains ls               # list domains
vercel alias ls                 # list aliases
vercel projects ls              # list projects
vercel whoami                   # current user
vercel --help                   # full help
```
