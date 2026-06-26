# inertia-native-docs

Documentation site for
[`inertia-hotwire-native`](https://github.com/zumkorn/inertia-hotwire-native) —
running Inertia.js apps inside Hotwire Native (iOS & Android).

Built with [VitePress](https://vitepress.dev). Published to
[inertia-native.dev](https://inertia-native.dev).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: docs/.vitepress/dist
npm run preview  # serve the production build
```

## Deploy

Any static host works (Cloudflare Pages / Vercel / Netlify / GitHub Pages).
Build settings:

- **Build command:** `npm run build`
- **Output directory:** `docs/.vitepress/dist`
- **Custom domain:** `inertia-native.dev` (`.dev` is HTTPS-only via HSTS preload —
  every host above provisions TLS automatically)
