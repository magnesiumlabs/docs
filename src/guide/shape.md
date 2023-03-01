# Shape

The Magnesium Design shape system help you to create a shape who reflects your design or style.

## Usage

### Configuration

```scss
@use "@magnesium/framework" with (
    $shapes: (
        "primary": darkcyan
    )
);
```

#### Import

```scss
@use "@magnesium/framework/shape";
```

## `theme($theme)`

Generates user-provided theme's tokens for the shape component management with tokens validation. All CSS custom
properties name will be generated with `shape` prefix tag.

#### Example

```scss
@use "@magnesium/framework/shape";

$theme: (
    "filled": 6px
);

.foo {
    @include shape.theme($theme);
}
```

#### Result

```css
.foo {
    --mg-shape-filled: 6px;
}
```
