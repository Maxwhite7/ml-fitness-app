# ML Fitness App — Deployment Guide

## What's in this folder
- `src/App.jsx` — your full app
- `src/main.jsx` — entry point
- `index.html` — HTML shell
- `package.json` — dependencies
- `vite.config.js` — build config
- `netlify.toml` — Netlify build instructions

---

## How to deploy on Netlify

### Option A — Netlify + GitHub (recommended, auto-updates)

1. Go to **github.com** → sign up free → click **New Repository**
2. Name it `ml-fitness-app` → click **Create**
3. Upload ALL files from this folder (drag and drop in GitHub)
4. Go to **netlify.com** → sign up free → **Add new site → Import from Git**
5. Connect GitHub → select `ml-fitness-app`
6. Build command: `npm run build`
7. Publish directory: `dist`
8. Click **Deploy** — you'll get a live link in ~2 minutes!

### Option B — Netlify CLI (faster)

1. Install Node.js from nodejs.org
2. Open Terminal in this folder
3. Run: `npm install`
4. Run: `npm run build`
5. Drag the `dist` folder to **netlify.com/drop**

---

## Your live URLs will look like:
`https://ml-fitness-XXXX.netlify.app`

You can set a custom name in Netlify settings (e.g. `mlfitness.netlify.app`)

---

## Sharing with clients
Once live, just send them the link. They click "Create your account",
pick their name from the list, and set their email + password.
