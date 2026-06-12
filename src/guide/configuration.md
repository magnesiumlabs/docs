---
title: Configuration
description: Configure Magnesium with the Sass @use ... with syntax, including the global $prefix applied to every generated CSS custom property name.
---

# Configuration

## Options

| Option    | Type     | Description                                                    | Default |
|-----------|----------|----------------------------------------------------------------|---------|
| `$prefix` | `string` | Global prefix applied to every generated custom property name. | `mg`    |

Configure via the Sass `@use ... with` syntax:

```scss
@use "@magnesium/theme" with (
    $prefix: "ds"
);
```

All generated custom properties will use the new prefix:

```css
--ds-button-text-color: darkcyan;
```

## Disabling the prefix

Set `$prefix` to `false` to emit custom properties without any prefix:

::: code-group
```scss
@use "@magnesium/theme" with (
    $prefix: false
);

$tokens: (
    "text-color": darkcyan
);

:root {
    @include theme.emit($tokens, "button");
}
```

```css
:root {
    --button-text-color: darkcyan;
}
```
:::

::: tip
`$prefix` must be configured once, at your compilation entry point. All other files that `@use "@magnesium/theme"` will
inherit the configured prefix automatically — no need to repeat `with (...)`.

Configuring it in multiple files will cause a Sass error. If a dependency already configures `@magnesium/theme`, use
the [compat layer](./migration#compat-layer) which exposes the deprecated `config()` mixin as a workaround.
:::
