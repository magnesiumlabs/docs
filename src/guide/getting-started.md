---
title: Getting Started
description: Install Magnesium and emit your first design tokens as CSS custom properties in a few lines of Sass. Requires Node.js 20.19+ and Sass 1.97.1+.
---

# Getting Started

## Requirements

| Dependency | Version                    |
|------------|----------------------------|
| Node.js    | `^20.19.0 \|\| >= 22.12.0` |
| Sass       | `>= 1.97.1`                |

## Browser support

Magnesium outputs plain CSS custom properties, supported by every modern browser. The optional `$layer` parameter relies on [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer): Chrome and Edge 99, Firefox 97, Safari 15.4 and later.

## Installation

```bash
npm install @magnesium/theme
```

## Playground

Try it live on StackBlitz:

[Open in StackBlitz](https://stackblitz.com/~/github.com/magnesiumlabs/magnesium)

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

## Sass command line

The Sass CLI does not look inside `node_modules` on its own. Point it there with `--load-path`:

```bash
sass --load-path=node_modules src/styles.scss dist/styles.css
```

Without it, compilation fails with `Can't find stylesheet to import`. See [Troubleshooting](./troubleshooting).

## Coming from v4?

See the [migration guide](./migration) for a complete mapping of the old API to v5.
