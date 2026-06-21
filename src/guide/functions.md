---
title: Functions
description: API reference for Magnesium's Sass functions for building prefixed names and referencing design tokens as var() expressions.
---

# Functions

## `name($name...)`

Builds a hyphenated, prefixed string from one or more parts. `null` parts are skipped. Returns a plain **string**, not a CSS variable — use `ref()` when you need a `var()` expression.

#### Parameters

| Parameter | Description             | Default     |
|-----------|-------------------------|-------------|
| `$name`   | One or more name parts. | `undefined` |

#### Usage

```scss
@use "@magnesium/theme";

theme.name("button", "text-color") // → "mg-button-text-color"
theme.name(null, "button")         // → "mg-button"
```

::: tip `name()` vs `ref()`
Use `name()` when you need the raw string to build a custom property name programmatically. Use `ref()` when you need a ready-to-use `var(--mg-...)` expression as a CSS value.
:::

---

## `ref($token)`

Returns a `var()` expression for a token name, using the configured prefix. Use this to reference a token across namespaces without hardcoding the prefix.

#### Parameters

| Parameter | Description      | Default     |
|-----------|------------------|-------------|
| `$token`  | The token name.  | `undefined` |

#### Usage

::: code-group
```scss
@use "@magnesium/theme";

.foo {
    color: theme.ref("sys-primary");
}
```

```css
.foo {
    color: var(--mg-sys-primary);
}
```
:::

---

## `refs($tokens, $namespace)`

Transforms a tokens map into `var()` references with fallback values. The Sass map structure is preserved — nested maps remain nested, but their keys are joined into hyphenated CSS variable names. `null` values are preserved as-is.

#### Parameters

| Parameter    | Description                              | Default     |
|--------------|------------------------------------------|-------------|
| `$tokens`    | The tokens map.                          | `undefined` |
| `$namespace` | Namespace to prepend (without prefix).   | `null`      |

#### Usage

```scss
@use "@magnesium/theme";

$tokens: (
    "text-color": darkcyan,
    "font-size": 1rem
);

$refs: theme.refs($tokens, "button");
// →
// (
//   "text-color": var(--mg-button-text-color, darkcyan),
//   "font-size": var(--mg-button-font-size, 1rem)
// )
```

Nested maps — the Sass structure is kept, keys are joined in the CSS variable name:

```scss
$tokens: (
    "padding": (
        "top": 12px
    )
);

$refs: theme.refs($tokens, "button");
// → "padding": ("top": var(--mg-button-padding-top, 12px))
```

---

## `validation($refs, $tokens)`

Validates user-provided tokens against a reference schema. Returns `$tokens` unchanged if valid. Throws `@error` with the list of supported tokens if an unknown key is found.

#### Parameters

| Parameter | Description                                     | Default     |
|-----------|-------------------------------------------------|-------------|
| `$refs`   | The reference schema — a map or list of keys.   | `undefined` |
| `$tokens` | The user-provided tokens map to validate.       | `undefined` |

#### Usage

```scss
@use "@magnesium/theme";

$refs: (
    "text-color": darkcyan,
    "font-size": 1rem
);

$tokens: (
    "text-color": darkorange
);

$validated: theme.validation($refs, $tokens);
// → returns $tokens unchanged
```

A list can also be used as `$refs`:

```scss
$refs: ("text-color", "font-size");
```

#### Error case

Passing an unsupported token key throws a compile-time error:

```scss
$tokens: (
    "unknown-token": red
);

$validated: theme.validation($refs, $tokens);
// → @error "Unsupported token: 'unknown-token'. Supported tokens: 'text-color, font-size'"
```

---

## `variable($tokens, $token, $namespace, $fallback)`

Returns a `var()` expression for a single token key. Throws `@error` if the token is not in the map.

#### Parameters

| Parameter    | Description                              | Default     |
|--------------|------------------------------------------|-------------|
| `$tokens`    | The tokens map.                          | `undefined` |
| `$token`     | The token key to look up.                | `undefined` |
| `$namespace` | Namespace to prepend (without prefix).   | `null`      |
| `$fallback`  | Include the token value as CSS fallback. | `false`     |

#### Usage

::: code-group
```scss
@use "@magnesium/theme";

$tokens: (
    "text-color": darkcyan
);

.foo {
    color: theme.variable($tokens, "text-color", "button");
}
```

```css
.foo {
    color: var(--mg-button-text-color);
}
```
:::

With fallback:

::: code-group
```scss
.foo {
    color: theme.variable($tokens, "text-color", "button", $fallback: true);
}
```

```css
.foo {
    color: var(--mg-button-text-color, darkcyan);
}
```
:::

Without namespace:

::: code-group
```scss
.foo {
    color: theme.variable($tokens, "text-color");
}
```

```css
.foo {
    color: var(--mg-text-color);
}
```
:::
