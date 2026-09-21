# Northstar Medical — Viral Landing (Standalone)

Standalone marketing landing page for **Northstar Medical** (Ontario virtual primary care).

> This is **not** the production backend (`northstar-backend`).  
> Demo / design exploration only. Do not treat a preview as a live publish.

## Live concept

- Cinematic hero film loop
- **Nova** glossy blue robot as a standalone visitor guide (booking, plans, OHIP, emergencies, after-visit)
- Wait-list flip, family plan builder, share CTAs
- Mobile sticky dock

## Run locally

```bash
npm install
npm run dev
# open the URL Vite prints (default :8080)
```

Production build check:

```bash
npm run build
```

## Where Nova lives

- Floating robot launcher opens a fullscreen **avatar stage** (`src/components/landing/nova-stage.tsx`) — speech comes from the robot, not a chat thread
- Hero Nova portrait also opens the same stage (`src/components/landing/nova-avatar.tsx`)
- Robot stills: `public/images/nova-robot-stage.jpg` (full-body stage), plus face / launcher / portrait crops
- Locked answers + keyword matching: `src/data/nova-guide.ts` (no external AI, no PHI collection)
- Signup CTAs keep pointing at https://app.northstarmed.ca/onboarding/get-started

## Share copy (paste into group chat)

> I stopped waiting months for a family doctor.  
> Northstar Medical = unlimited nurse practitioner care for your whole Ontario family — often same day.  
> Join: https://app.northstarmed.ca/onboarding/get-started

## Production product

Patient app: https://app.northstarmed.ca  
Signup CTAs on this page point there.

---

© 2026 Northstar Medical branding used for demo packaging.
