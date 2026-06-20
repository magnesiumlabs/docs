# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Documentation site for [Magnesium](https://magnesium.dev), a Sass framework for web design systems. Built with VitePress 2 (alpha) and Vue 3.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Build static site to .vitepress/dist/
npm run preview   # Preview the built site
```

Node ≥ 20 required.

## Architecture

- `src/` — All Markdown content (VitePress `srcDir`)
  - `index.md` — Home page
  - `guide/` — Documentation pages (what-is-magnesium, getting-started, configuration, functions, mixins, theme, patterns, migration, whats-new)
  - `public/` — Static assets (logo, favicon, og-image, robots.txt) copied as-is to build output
- `.vitepress/config.ts` — Site config: nav, sidebar, theme config
- `.vitepress/theme/` — Theme customization (extends DefaultTheme, overrides CSS variables)

Adding a page requires both a new `src/guide/*.md` file and a sidebar entry in `.vitepress/config.ts`.

## Commit conventions

Commits are enforced by commitlint (conventional commits, via Husky `commit-msg` hook). Messages must follow `type(scope): description` format in English.
