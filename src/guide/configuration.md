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
The module can only be configured once per compilation (Sass restriction). If a dependency already configures `@magnesium/theme`, use the [compat layer](./migration#compat-layer) which exposes the deprecated `config()` mixin as a workaround.
:::
