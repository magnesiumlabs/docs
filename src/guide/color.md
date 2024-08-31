# Color

The color component will help you to define your theme colors.

## Options

Use the global `$color` parameter to configure color schemes.

| Option   | Type     | Description                                        | Default |
|----------|----------|----------------------------------------------------|---------|
| `prefix` | `string` | Update color prefix name on any custom properties. | `color` |
| `tokens` | `map`    | Add map of color tokens                            | `()`    |

#### Example

```scss
@use "@magnesium/theme" with (
    $color: (
        "prefix": "sys-color",
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

```scss
@use "@magnesium/theme/color";

:root {
    @include color.theme((
        "primary": darkcyan
    ));
}
```

#### Returns

```scss
:root {
    --mg-sys-color-primary: darkcyan;
}
```
