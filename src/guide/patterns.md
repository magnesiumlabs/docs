---
title: Patterns
description: Common patterns for structuring design tokens with Magnesium, from global token layers to component-scoped custom properties.
---

# Patterns

Common patterns for structuring design tokens with Magnesium.

## Global token layer

Define all your tokens at `:root` under a named CSS cascade layer so they land at the bottom of the specificity stack and can be overridden safely anywhere.

::: code-group
```scss
@use "@magnesium/theme";

$color-tokens: (
    "primary": #0071d7,
    "on-primary": #fff,
    "surface": #f5f5f5
);

$shape-tokens: (
    "small": 4px,
    "medium": 8px,
    "large": 16px
);

:root {
    @include theme.emit($color-tokens, "color", $layer: "tokens");
    @include theme.emit($shape-tokens, "shape", $layer: "tokens");
}
```

```css
@layer tokens {
    :root {
        --mg-color-primary: #0071d7;
        --mg-color-on-primary: #fff;
        --mg-color-surface: #f5f5f5;
        --mg-shape-small: 4px;
        --mg-shape-medium: 8px;
        --mg-shape-large: 16px;
    }
}
```
:::

## Component theming

The recommended pattern for a themeable component:

1. Define a reference map with default values.
2. Emit defaults at `:root`.
3. Consume tokens in component rules with `variable()`.
4. Let consumers override via `theme()`.

::: code-group
```scss
@use "@magnesium/theme";

// 1. Default token values
$_defaults: (
    "text-color": #fff,
    "bg-color": #0071d7,
    "border-radius": 4px
);

// 2. Emit defaults at root
:root {
    @include theme.emit($_defaults, "button");
}

// 3. Consume tokens in the component
.button {
    color: theme.variable($_defaults, "text-color", "button");
    background: theme.variable($_defaults, "bg-color", "button");
    border-radius: theme.variable($_defaults, "border-radius", "button");
}
```

```css
:root {
    --mg-button-text-color: #fff;
    --mg-button-bg-color: #0071d7;
    --mg-button-border-radius: 4px;
}

.button {
    color: var(--mg-button-text-color);
    background: var(--mg-button-bg-color);
    border-radius: var(--mg-button-border-radius);
}
```
:::

A consumer overrides the component theme with `theme()`, which validates tokens before emitting:

::: code-group
```scss
.card .button {
    @include theme.theme($_defaults, (
        "bg-color": darkorange
    ), "button");
}
```

```css
.card .button {
    --mg-button-bg-color: darkorange;
}
```
:::

## Dark mode

### Media query (automatic)

::: code-group
```scss
@use "@magnesium/theme";

$dark-tokens: (
    "primary": #00b2e9,
    "surface": #1a1a1a
);

@include theme.scheme("dark") {
    :root {
        @include theme.emit($dark-tokens, "color");
    }
}
```

```css
@media (prefers-color-scheme: dark) {
    :root {
        --mg-color-primary: #00b2e9;
        --mg-color-surface: #1a1a1a;
    }
}
```
:::

### Explicit selector (user-controlled)

When using `$selector`, emit tokens directly inside the `scheme()` block — do not nest `:root` inside it, as that would generate an invalid descendant selector.

::: code-group
```scss
@include theme.scheme("dark", $selector: "[data-theme='dark']") {
    @include theme.emit($dark-tokens, "color");
}
```

```css
[data-theme='dark'] {
    --mg-color-primary: #00b2e9;
    --mg-color-surface: #1a1a1a;
}
```
:::

## Cross-namespace references

Use `ref()` to reference a token from another namespace without hardcoding the prefix. This is useful for aliasing system tokens to component tokens.

::: code-group
```scss
@use "@magnesium/theme";

$sys-tokens: (
    "primary": #0071d7
);

:root {
    @include theme.emit($sys-tokens, "sys");
}

// Button aliases the system token via ref()
$button-tokens: (
    "bg-color": theme.ref("sys-primary")
);

:root {
    @include theme.emit($button-tokens, "button");
}
```

```css
:root {
    --mg-sys-primary: #0071d7;
    --mg-button-bg-color: var(--mg-sys-primary);
}
```
:::
