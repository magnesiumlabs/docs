# Mixins

## `emit($tokens, $namespace, $include, $exclude, $layer)`

Emits CSS custom property declarations from a tokens map. Nested maps are flattened recursively.

::: info Null vs falsy
`null` values are **silently skipped** — no custom property is emitted. Falsy values such as `0`, `0px`, or `false` are emitted as-is, since they are valid CSS values.
:::

#### Parameters

| Parameter    | Description                                              | Default |
|--------------|----------------------------------------------------------|---------|
| `$tokens`    | The tokens map.                                          | —       |
| `$namespace` | Namespace to prepend (without prefix).                   | `null`  |
| `$include`   | List of token keys to emit. All others are skipped.      | `null`  |
| `$exclude`   | List of token keys to skip.                              | `null`  |
| `$layer`     | CSS cascade layer name. Wraps output in `@layer`.        | `null`  |

#### Usage

::: code-group
```scss
@use "@magnesium/theme";

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
    --mg-button-text-color: darkcyan;
    --mg-button-font-size: 1rem;
}
```
:::

#### Filtering with `$include` / `$exclude`

::: code-group
```scss
:root {
    @include theme.emit($tokens, "button", $include: ("text-color"));
}
```

```css
:root {
    --mg-button-text-color: darkcyan;
}
```
:::

When both are provided, `$exclude` applies on top of `$include` — a key must be in `$include` **and** not in `$exclude` to be emitted:

::: code-group
```scss
@include theme.emit((
    "primary": blue,
    "secondary": coral,
    "accent": gold,
    "muted": gray
), "color", $include: ("primary", "accent", "muted"), $exclude: ("muted",));
```

```css
--mg-color-primary: blue;
--mg-color-accent: gold;
/* "muted" is excluded despite being in $include */
```
:::

#### Cascade layers with `$layer`

::: code-group
```scss
@include theme.emit($tokens, "button", $layer: "tokens");
```

```css
@layer tokens {
    --mg-button-text-color: darkcyan;
    --mg-button-font-size: 1rem;
}
```
:::

#### Nested maps

::: code-group
```scss
$tokens: (
    "padding": (
        "top": 12px,
        "bottom": 8px
    )
);

:root {
    @include theme.emit($tokens, "button");
}
```

```css
:root {
    --mg-button-padding-top: 12px;
    --mg-button-padding-bottom: 8px;
}
```
:::

---

## `theme($refs, $tokens, $namespace, $include, $exclude)`

Validates user-provided tokens against a reference schema, then emits the custom property declarations in one call. Throws `@error` on unknown tokens.

#### Parameters

| Parameter    | Description                                               | Default |
|--------------|-----------------------------------------------------------|---------|
| `$refs`      | Reference schema — a map or list of supported token keys. | —       |
| `$tokens`    | The user-provided tokens map.                             | —       |
| `$namespace` | Namespace to prepend (without prefix).                    | `null`  |
| `$include`   | List of token keys to emit.                               | `null`  |
| `$exclude`   | List of token keys to skip.                               | `null`  |

#### Usage

::: code-group
```scss
@use "@magnesium/theme";

$refs: (
    "text-color": darkcyan,
    "font-size": 1rem
);

.foo {
    @include theme.theme($refs, ("text-color": darkorange), "button");
}
```

```css
.foo {
    --mg-button-text-color: darkorange;
}
```
:::

---

## `scheme($scheme, $selector, $layer)`

Scopes content to a color scheme. Without `$selector`, wraps in a `@media (prefers-color-scheme)` query. With `$selector`, wraps in a selector rule instead. With `$layer`, wraps the whole output in a named cascade layer.

#### Parameters

| Parameter   | Description                                                              | Default   |
|-------------|--------------------------------------------------------------------------|-----------|
| `$scheme`   | The color scheme: `"light"` or `"dark"`.                                 | `"light"` |
| `$selector` | A CSS selector to scope content. Bypasses the media query when provided. | `null`    |
| `$layer`    | CSS cascade layer name. Wraps the whole output in `@layer`.              | `null`    |

#### Usage — media query

::: code-group
```scss
@use "@magnesium/theme";

@include theme.scheme("dark") {
    :root {
        --mg-color-primary: darkorange;
    }
}
```

```css
@media (prefers-color-scheme: dark) {
    :root {
        --mg-color-primary: darkorange;
    }
}
```
:::

#### Usage — explicit selector

::: code-group
```scss
@include theme.scheme("dark", $selector: "[data-theme='dark']") {
    --mg-color-primary: darkorange;
}
```

```css
[data-theme='dark'] {
    --mg-color-primary: darkorange;
}
```
:::

#### Usage — cascade layer

`$layer` wraps the whole output — media query or selector — in a named layer, so light and dark declarations share the same cascade layer.

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
