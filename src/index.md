---
layout: home

hero:
  name: "Magnesium"
  text: "A Sass toolkit for design tokens."
  tagline: "Stateless. Explicit. Composable."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Github
      link: https://github.com/magnesiumlabs/magnesium

features:
  - icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="11.5" r="2.5"/><circle cx="17.5" cy="14" r="2.5"/><path d="M9 17.5h6M5 16v3M19 17v2"/></svg>'
    title: Token-first
    details: Define design tokens as plain Sass maps. Emit them as scoped, prefixed CSS custom properties with a single call.
  - icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg>'
    title: Fully stateless
    details: No token registry, no mutation between calls. The prefix is set once at import, the namespace is explicit at every call.
  - icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 7.5 12 12l9-4.5L12 3Z"/><path d="M3 12l9 4.5L21 12"/><path d="M3 16.5 12 21l9-4.5"/></svg>'
    title: Cascade layer ready
    details: Wrap any token emission in a named @layer out of the box, for full control over the CSS cascade.
---
