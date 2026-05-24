::: warning Deprecated
This page documents the `@magnesium/theme/shape` sub-module from v4, removed in v5.

Shape tokens are now managed directly with `emit()` and a `"shape"` namespace:

```scss
@use "@magnesium/theme";

$shape-tokens: (
    "small": 4px,
    "medium": 8px,
    "large": 16px
);

:root {
    @include theme.emit($shape-tokens, "shape");
}
```

See [Patterns](../patterns#global-token-layer) for a full example.
:::
