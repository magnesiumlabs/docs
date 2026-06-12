---
title: What's New in v5
description: Highlights of the Magnesium v5 rewrite — a fully stateless and explicit API, including the new theme() mixin for validating and emitting tokens in one call.
---

# What's New in v5

v5 is a full API rewrite focused on making every call stateless and explicit. Here are the highlights.

## New: `theme()` mixin

Validates tokens against a reference schema and emits custom properties in a single call — no need to call `validation()` then `emit()` separately.

::: code-group
```scss
@use "@magnesium/theme";

$refs: (
    "text-color": darkcyan,
    "font-size": 1rem
);

.button {
    @include theme.theme($refs, ("text-color": darkorange), "button");
}
```

```css
.button {
    --mg-button-text-color: darkorange;
}
```
:::

## New: `ref()` function

Returns a `var()` reference for a token by name, using the configured prefix. Useful for aliasing tokens across namespaces without hardcoding the prefix.

```scss
.button {
    background: theme.ref("sys-primary");
    // → var(--mg-sys-primary)
}
```

## New: `$layer` on `emit()`

Wrap any token emission in a named CSS cascade layer with the `$layer` parameter.

::: code-group
```scss
:root {
    @include theme.emit($tokens, "color", $layer: "tokens");
}
```

```css
@layer tokens {
    :root {
        --mg-color-primary: #0071d7;
    }
}
```
:::

## New: `$selector` on `scheme()`

Scope a color scheme to an explicit CSS selector instead of a `@media` query — useful for user-controlled theme switching.

::: code-group
```scss
@include theme.scheme("dark", $selector: "[data-theme='dark']") {
    --mg-color-primary: #00b2e9;
}
```

```css
[data-theme='dark'] {
    --mg-color-primary: #00b2e9;
}
```
:::

## New: `$layer` on `scheme()`

Wrap a color scheme — media query or selector — in a named CSS cascade layer with the `$layer` parameter, so light and dark declarations share the same layer.

::: code-group
```scss
@include theme.scheme("dark", $layer: "tokens") {
    :root {
        --mg-color-primary: darkorange;
    }
}
```

```css
@layer tokens {
    @media (prefers-color-scheme: dark) {
        :root {
            --mg-color-primary: darkorange;
        }
    }
}
```
:::

## New: `$namespace` replaces `$prefix` / `$component`

All functions and mixins now use a consistent `$namespace` parameter (without the global prefix) instead of the previous `$prefix` or `$component` names.

## Compat layer

All v4 APIs are still available via the compatibility layer during migration. See the [migration guide](./migration).
