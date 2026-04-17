# Rajat's Portfolio

An interactive, VS Code-inspired portfolio for Rajat Sharma. It blends a polished developer workspace aesthetic with personal branding, project showcases, a terminal, a Copilot-style assistant, and smooth motion throughout the site.

## Highlights

- VS Code-style layout with explorer, tabs, terminal, and command palette
- Command palette works with both click and keyboard flows (open via Search or Ctrl+P, close via Escape or outside click)
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
- [src/app/api/copilot/route.ts](src/app/api/copilot/route.ts) - Copilot assistant API

## Copilot Tips

The Copilot panel understands a few portfolio-specific shortcuts:

- `/projects` - opens the projects section guidance
- `/contact` - points to contact details
- `/resume` - points to the resume file in the sidebar

If a visitor asks about dark mode, it replies with the portfolio's running joke: it lives in Dark+.

## Deployment

This project is ready for standard Next.js deployment targets such as Vercel or any Node-compatible hosting platform.

## Notes

If you want to expand the project, the best places to start are the main page shell in [src/app/page.tsx](src/app/page.tsx) and the assistant logic in [src/app/api/copilot/route.ts](src/app/api/copilot/route.ts).
