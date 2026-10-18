# London Blooms

London Blooms is a local web app that estimates the next cherry blossom window and maps notable viewing spots around London.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). To make a production build, run:

```bash
npm run build
```

No environment variables or API keys are required. The map uses a public CARTO basemap and needs an internet connection to load its style and tiles.

## What’s included

- A static forecast loaded from `public/data/prediction.json`.
- A MapLibre map with London blossom locations and hover details.
- A history page with facts adapted from The Royal Parks.
- Falling blossoms, a cursor blossom, and a local browser visitor counter.

The forecast is a proof-of-concept estimate, not a live weather prediction. The visitor count is stored in the current browser only.
