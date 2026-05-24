::: warning Deprecated
This page documents the `@magnesium/theme/color` sub-module from v4, removed in v5.

Color tokens are now managed directly with `emit()` and a `"color"` namespace:

```scss
@use "@magnesium/theme";

$color-tokens: (
    "primary": #0071d7,
    "secondary": darkorange
);

:root {
    @include theme.emit($color-tokens, "color");
}
```

See [Patterns](../patterns#global-token-layer) for a full example.
:::
