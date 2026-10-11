---
title: What is Magnesium?
description: Magnesium is a stateless Sass toolkit that turns Sass maps into scoped, prefixed CSS custom properties, with validation, cascade layers and color schemes.
---

# What is Magnesium?

**Magnesium** is a Sass toolkit for managing design tokens as CSS custom properties.

It provides a small set of stateless functions and mixins that transform Sass maps into scoped, prefixed custom property declarations — with built-in support for token validation, cascade layers, and color scheme scoping.

## How it works

The entire model is **define → emit → consume**.

**Define** your tokens as a plain Sass map:

```scss
@use "@magnesium/theme";

$tokens: (
    "text-color": darkcyan,
    "font-size": 1rem
);
```

**Emit** them as CSS custom properties:

::: code-group
```scss
:root {
    @include theme.emit($tokens, "button");
}
```

```css
:root {
    --mg-button-text-color: darkcyan;
    --mg-button-font-size: 1rem;
}
```
:::

**Consume** individual tokens in component rules:

::: code-group
```scss
.button {
    color: theme.variable($tokens, "text-color", "button");
    font-size: theme.variable($tokens, "font-size", "button");
}
```

```css
.button {
    color: var(--mg-button-text-color);
    font-size: var(--mg-button-font-size);
}
```
:::

## Why Magnesium

- **Plain CSS output.** Tokens end up as CSS custom properties: there is no runtime, so they can be overridden from any stylesheet or element.
- **Stateless.** Nothing is registered or mutated between calls; the namespace is passed explicitly every time. See [Functions](./functions).
- **Validated at compile time.** `theme()` and `validation()` reject unknown tokens with an error that lists the supported ones, so a typo fails the build instead of silently doing nothing.
- **Cascade-layer and color-scheme aware.** Wrap emissions in a named `@layer` and scope them to `prefers-color-scheme` or an explicit selector. See [Mixins](./mixins).
