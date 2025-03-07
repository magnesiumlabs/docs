# Color

The color component will help you to easily define your custom theme colors.

## Options

Use the global `$color` parameter to configure color schemes.

| Option   | Type     | Description                                                                         | Default |
|----------|----------|-------------------------------------------------------------------------------------|---------|
| `prefix` | `string` | Update color prefix name on any custom properties.                                  | `color` |
| `tokens` | `map`    | Add map of color tokens. Needed for tokens validation when `theme()` mixin is used. | `()`    |

#### Example

```scss
@use "@magnesium/theme" with (
    $color: (
        "tokens": (
            "primary",
            "secondary"
        )
    )
);
```

## Theme

Override the theme custom property with the `theme()` mixin.

### Usage

::: code-group
```scss
@use "@magnesium/theme/color";

.foo {
    @include color.theme((
        "primary": darkcyan,
        "secondary": darkorange
    ));
}
```

```css
.foo {
    --mg-color-primary: darkcyan;
    --mg-color-secondary: darkorange;
}
```
:::
