---
title: Migrating from v4
description: Upgrade guide from Magnesium v4 to v5, covering the renamed API, removed config() mixin and sub-modules, and before/after examples.
---

# Migrating from v4

v5 is a full rewrite of the API. All functions and mixins have been renamed or replaced. The old API is **deprecated** and will be removed in v6.

## Breaking changes

- `$prefix`/`$component` parameters renamed to `$namespace` everywhere.
- `config()` mixin removed — use `@use ... with ($prefix: ...)` instead.
- Sub-modules `@magnesium/theme/color` and `@magnesium/theme/shape` are removed.

## Before / after

**Emitting custom properties**

::: code-group
```scss [v4]
@use "@magnesium/theme";

$theme: (
    "text-color": darkcyan
);

.button {
    @include theme.emit-custom-props($theme, "button");
}
```

```scss [v5]
@use "@magnesium/theme";

$tokens: (
    "text-color": darkcyan
);

.button {
    @include theme.emit($tokens, "button");
}
```

```css [Output]
.button {
    --mg-button-text-color: darkcyan;
}
```
:::

**Referencing a token value**

::: code-group
```scss [v4]
.button {
    color: theme.emit-variable($theme, "text-color", false, "button");
}
```

```scss [v5]
.button {
    color: theme.variable($tokens, "text-color", "button");
}
```
:::

**Color scheme scoping**

::: code-group
```scss [v4]
@include theme.emit-color-scheme("dark") {
    .button { --mg-button-text-color: darkorange; }
}
```

```scss [v5]
@include theme.scheme("dark") {
    .button { --mg-button-text-color: darkorange; }
}

// or with an explicit selector:
@include theme.scheme("dark", $selector: "[data-theme='dark']") {
    .button { --mg-button-text-color: darkorange; }
}
```
:::

**Configuring the prefix**

::: code-group
```scss [v4]
@use "@magnesium/theme";
@include theme.config("ds");
```

```scss [v5]
@use "@magnesium/theme" with ($prefix: "ds");
```
:::

## API mapping

| v4                                                | v5                                                 |
|---------------------------------------------------|----------------------------------------------------|
| `config($prefix: "ds")`                           | `@use "@magnesium/theme" with ($prefix: "ds")`     |
| `create-name("btn", "color")`                     | `name("btn", "color")`                             |
| `create-theme-vars($tokens, "btn")`               | `refs($tokens, "btn")`                             |
| `emit-variable($tokens, "token", true, "btn")`    | `variable($tokens, "token", "btn", true)`          |
| `emit-custom-props($tokens, "btn")`               | `emit($tokens, "btn")`                             |
| `emit-color-scheme("dark")`                       | `scheme("dark")`                                   |
| `emit-theme-vars($refs-map)`                      | `emit($refs-map)`                                  |

## Compat layer

Import the compatibility layer to keep using the v4 API while migrating progressively:

```scss
@use "@magnesium/theme/compat" as theme;
```

The compat layer re-exposes the v4 API on top of v5 internals and emits a `@warn` on each deprecated call. It also re-exports the full v5 API, so you can migrate call by call under a single import.

::: warning
The compat layer and all deprecated APIs will be removed in v6.
:::
