# Color

The Magnesium Design color system help you to create a color who reflects your design or style.

## Usage

### Configuration

```scss
@use "@magnesium/framework" with (
    $colors: (
        "primary": darkcyan
    )
);
```

#### Import

```scss
@use "@magnesium/framework/color";
```

## `theme($theme)`

Generates user-provided theme's tokens for the color component management with tokens validation. All CSS custom
properties name will be generated with `color` prefix tag.

#### Example

```scss
@use "@magnesium/framework/color";

$theme: (
    "primary": darkorange
);

.foo {
    @include color.theme($theme);
}
```

#### Result

```css
.foo {
    --mg-color-primary: darkorange;
}
```
