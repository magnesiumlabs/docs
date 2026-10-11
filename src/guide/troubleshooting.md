---
title: Troubleshooting
description: Fix common Magnesium compile errors, from unresolved imports and double configuration to unsupported tokens and invalid color schemes.
---

# Troubleshooting

The error messages below are the ones Sass reports when compiling with `@magnesium/theme` 5.

## Can't find stylesheet to import

```
Error: Can't find stylesheet to import.
  @use "@magnesium/theme";
```

Sass does not resolve packages from `node_modules` by default. Add `--load-path=node_modules` to the CLI, or use the [`pkg:` importer](./getting-started#pkg-importer) in toolchains that support it. See [Sass command line](./getting-started#sass-command-line).

## This module was already loaded

```
Error: This module was already loaded, so it can't be configured using "with".
```

`$prefix` can only be configured once, at the compilation entry point. Remove `with (...)` from every other `@use "@magnesium/theme"`: they inherit the prefix on their own. If a dependency configures the module itself, use the [compat layer](./migration#compat-layer). See [Configuration](./configuration).

## Declarations may only be used within style rules

`emit()` outputs declarations, so it must be included inside a selector:

```scss
// ✗ Error
@include theme.emit($tokens, "button");

// ✓
:root {
    @include theme.emit($tokens, "button");
}
```

## Unsupported token

```
Error: "Unsupported token: 'b'. Supported tokens: 'a'"
```

Raised by [`theme()`](./mixins#theme-refs-tokens-namespace-include-exclude-layer) and [`validation()`](./functions#validation-refs-tokens) when a key is missing from the reference schema. Fix the typo, or add the key to `$refs`.

## Unknown token

```
Error: "Unknown token: 'b'. Available tokens: 'a'"
```

Raised by [`variable()`](./functions#variable-tokens-token-namespace-fallback) when the key is not in the tokens map you passed.

## Invalid color scheme

```
Error: "Invalid color scheme 'blue'. Choose one of 'light, dark'."
```

[`scheme()`](./mixins#scheme-scheme-selector-layer) only accepts `"light"` or `"dark"`. To target another theme, pass a `$selector` instead.

## A token is not emitted

`null` values are skipped on purpose, and `$include` / `$exclude` filter keys before emission. See [`emit()`](./mixins#emit-tokens-namespace-include-exclude-layer).
