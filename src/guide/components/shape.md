# Shape

The shape component will help you to easily define your custom theme shapes.

## Options

Use the global `$shape` parameter to configure shape schemes.

| Option   | Type     | Description                                                                         | Default |
|----------|----------|-------------------------------------------------------------------------------------|---------|
| `prefix` | `string` | Update shape prefix name on any custom properties.                                  | `shape` |
| `tokens` | `map`    | Add map of shape tokens. Needed for tokens validation when `theme()` mixin is used. | `()`    |

#### Example

```scss
@use "@magnesium/theme" with (
    $shape: (
        "tokens": (
            "small",
            "medium"
        )
    )
);
```

## Theme

Override the theme custom property with the `theme()` mixin.

### Usage

::: code-group
```scss
@use "@magnesium/theme/shape";

.foo {
    @include shape.theme((
        "small": 6px,
        "medium": 10px
    ));
}
```

```css
.foo {
    --mg-shape-small: 6px;
    --mg-shape-medium: 10px;
}
```
:::
