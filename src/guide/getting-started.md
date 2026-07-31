---
title: Getting Started
description: Install Magnesium and emit your first design tokens as CSS custom properties in a few lines of Sass. Requires Node.js ^20.19.0 || >= 22.12.0 and Sass >= 1.97.1.
---

# Getting Started

## Requirements

| Dependency | Version                    |
|------------|----------------------------|
| Node.js    | `^20.19.0 \|\| >= 22.12.0` |
| Sass       | `>= 1.97.1`                |

## Installation

```bash
npm install @magnesium/theme
```

## Playground

Try it live on StackBlitz:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/magnesiumlabs/magnesium)

## Usage

::: code-group
```scss
@use "@magnesium/theme" with ($prefix: "ds");

$tokens: (
    "text-color": darkcyan,
    "font-size": 1rem
);

:root {
    @include theme.emit($tokens, "button");
}
```

```css
:root {
    --ds-button-text-color: darkcyan;
    --ds-button-font-size: 1rem;
}
```
:::

## `pkg:` importer

If your toolchain uses the Sass `pkg:` importer (Vite, modern bundlers), use the package name directly:

```scss
@use "pkg:@magnesium/theme" with ($prefix: "ds");
```

Both forms are equivalent — use whichever your setup requires.

## Coming from v4?

See the [migration guide](./migration) for a complete mapping of the old API to v5.
