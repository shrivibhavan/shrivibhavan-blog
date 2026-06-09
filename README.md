# shrivibhavan.com — Personal Dev Blog

Built with **Next.js 15 (App Router) + MDX + Tailwind v4 + Resend**.

## Setup

```bash
npm install
npm run dev
```

## Writing a post

Create a file in `/posts/your-slug.mdx`:

```mdx
---
title: "Your Post Title"
date: "2026-06-08"
excerpt: "One sentence summary shown in cards."
tags: ["react", "typescript"]
---

Your content here in Markdown...
```

Push to GitHub → Vercel auto-deploys.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → Import → select repo
3. Add env variables from `.env.local.example`
4. Add your domain: `shrivibhavan.com`

## Newsletter (Resend)

1. Sign up at resend.com → get API key
2. Create an Audience → copy the audience ID
3. Add both to `.env.local`
4. Uncomment the Resend block in `/app/api/subscribe/route.ts`

## Folder structure

```
app/
  page.tsx          ← Homepage
  blog/page.tsx     ← Post listing
  blog/[slug]/      ← Individual posts
  about/page.tsx    ← About
  api/subscribe/    ← Newsletter API
components/
  Navbar.tsx
  NewsletterForm.tsx
lib/
  posts.ts          ← MDX file utilities
posts/
  hello-world.mdx   ← Your blog posts go here
```
