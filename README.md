# Rajat's Portfolio

An interactive, VS Code-inspired portfolio for Rajat Sharma. It blends a polished developer workspace aesthetic with personal branding, project showcases, a terminal, a Copilot-style assistant, and smooth motion throughout the site.

## Highlights

- VS Code-style layout with explorer, tabs, terminal, and command palette
- Command palette works with both click and keyboard flows (open via Search or Ctrl+P, close via Escape or outside click)
- Dynamic GitHub pulse cards (followers, repos, stars) with loading states
- Project filtering by category with per-project detail modal
- Skills section powered by live GitHub language stats (interactive donut chart)
- Skill chart supports hover bump, click-to-focus language detail, and grouped `Other` language listing
- Dedicated project detail pages under `/projects/[slug]` with route metadata
- Shared content model in `src/content/site-data.ts` for CMS-like content maintenance
- Accessible motion handling that respects reduced-motion preferences
- Real contact form flow via API route (`/api/contact`)
- Contact API anti-spam protections (honeypot + per-IP rate limit)
- Provider-ready email delivery path (Resend) with webhook fallback
- Vercel Analytics integrated for production usage tracking
- Minor UX polish: copy email action, keyboard shortcut panel, empty palette state
- Personalized sections for home, about, projects, skills, experience, and contact
- Built-in Copilot assistant with portfolio-aware responses
- Animated interactions powered by Framer Motion
- Responsive design tuned for desktop and mobile
- Dark-first visual system with custom typography and UI theming

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

- [src/app/page.tsx](src/app/page.tsx) - main portfolio experience and UI logic
- [src/app/layout.tsx](src/app/layout.tsx) - metadata, fonts, and global shell
- [src/app/globals.css](src/app/globals.css) - theme tokens and base styling
- [src/content/site-data.ts](src/content/site-data.ts) - shared portfolio content model
- [src/components/language-skill-chart.tsx](src/components/language-skill-chart.tsx) - interactive language usage chart for Skills tab
- [src/app/api/copilot/route.ts](src/app/api/copilot/route.ts) - Copilot assistant API
- [src/app/api/contact/route.ts](src/app/api/contact/route.ts) - contact form submission API
- [src/app/projects/page.tsx](src/app/projects/page.tsx) - projects index route
- [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx) - project detail route

## Copilot Tips

The Copilot panel understands a few portfolio-specific shortcuts:

- `/projects` - opens the projects section guidance
- `/contact` - points to contact details
- `/resume` - points to the resume file in the sidebar

If a visitor asks about dark mode, it replies with the portfolio's running joke: it lives in Dark+, and points to the top-right theme chip.

## Deployment

This project is ready for standard Next.js deployment targets such as Vercel or any Node-compatible hosting platform.

Set these deployment environment variables for contact delivery:

- `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to send emails via Resend
- Optional: `CONTACT_FROM_EMAIL` to customize sender identity
- Optional fallback: `CONTACT_WEBHOOK_URL` to forward submissions to a webhook endpoint

## Notes

If you want to expand the project, the best places to start are the main page shell in [src/app/page.tsx](src/app/page.tsx) and the assistant logic in [src/app/api/copilot/route.ts](src/app/api/copilot/route.ts).
