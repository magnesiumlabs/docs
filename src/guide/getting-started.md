# Getting Started

## Installation

Add Magnesium as dependencies for your project.

```shell
npm install @magnesium/theme
```

## Usage

```scss
@use "@magnesium/theme";

$theme: (
    "text-color": darkcyan
);

.foo {
    @include theme.emit-custom-props($theme, "button");
}
```

### Result

```css
.foo {
    --mg-button-text-color: darkcyan;
}
```
