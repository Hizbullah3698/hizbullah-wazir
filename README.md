# Hizbullah Wazir — Developer Portfolio

A premium, VS Code-themed developer portfolio built with Next.js 15, React 19, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)

## Overview

Interactive portfolio designed around a VS Code editor metaphor — complete with a file explorer sidebar, tab navigation, terminal windows, git commit logs, and a status bar. Built to showcase frontend engineering craft with premium micro-interactions and AI integration.

## Features

- **VS Code Theme** — File explorer sidebar, tab bar, terminal windows, and status bar recreate the IDE experience
- **AI Chatbot** — Gemini-powered assistant that answers recruiter questions about skills, experience, and availability
- **Custom Cursor** — Lerp-smoothed dot with trailing ring that reacts to interactive elements
- **3D Project Cards** — Perspective tilt following mouse position with radial glare reflection
- **Terminal Hero** — Typewriter animation in a CRT scan-line terminal window
- **Git Commit Experience** — Timeline styled as `git log --oneline --graph` with pulsing commit dots
- **Mobile-First Design** — 44px touch targets, responsive layouts from 320px, sidebar drawer on mobile
- **Scroll Parallax** — Gradient mesh background moves at 30% scroll speed
- **Magnetic Buttons** — CTA buttons subtly follow cursor with spring physics
- **Accessibility** — Skip-to-content, ARIA landmarks, keyboard navigation, focus-visible outlines
- **SEO Optimized** — JSON-LD Person schema, OG image generation, meta tags

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 15, React 19 |
| Language | TypeScript (Strict) |
| Styling | Tailwind CSS 3.4, Framer Motion |
| AI | Google Gemini API (2.5 Flash Lite) |
| Fonts | Syne, JetBrains Mono (Google Fonts) |
| Deployment | Vercel |

## Local Setup

```bash
# Clone the repository
git clone https://github.com/Hizbullah3698/hizbullah-wazir.git
cd portfolio-website

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Add your Gemini API key to .env.local:
# GEMINI_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Get a free Gemini API key at [ai.google.dev](https://ai.google.dev/).

## Deployment (Vercel)

1. Push the repository to GitHub
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Add the environment variable `GEMINI_API_KEY` in **Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js and handles the rest

## Project Structure

```
├── app/
│   ├── api/chat/          # Gemini AI chatbot endpoint
│   ├── layout.tsx         # Root layout, JSON-LD, metadata
│   ├── page.tsx           # Home page with lazy-loaded sections
│   ├── opengraph-image.tsx # Dynamic OG image generation
│   └── globals.css        # Design tokens, animations, utilities
├── components/
│   ├── hero/              # HeroSection, TerminalWindow
│   ├── about/             # AboutSection with profile photo
│   ├── experience/        # ExperienceSection, CommitItem
│   ├── projects/          # ProjectsSection, ProjectCard (3D tilt)
│   ├── skills/            # SkillsSection, SkillBlock
│   ├── education/         # EducationSection
│   ├── contact/           # ContactSection, TerminalForm
│   ├── chat/              # ChatWidget (AI assistant)
│   └── layout/            # Sidebar, TabBar, StatusBar, CustomCursor
├── constants/             # Data files (experience, projects, skills)
├── hooks/                 # useTypewriter, useScrollReveal, useReducedMotion
├── types/                 # TypeScript type definitions
└── public/                # Static assets (profile photo, resume)
```

---

**Live Site** → [hizbullah-wazir.vercel.app](https://hizbullah-wazir.vercel.app)
**LinkedIn** → [linkedin.com/in/hizbullahwazir](https://www.linkedin.com/in/hizbullahwazir)
**GitHub** → [github.com/Hizbullah3698](https://github.com/Hizbullah3698)
