# Getting Started

## Installation

Add Magnesium as dependencies for your project.

::: code-group
```bash [npm]
npm install @magnesium/theme
```
:::

## Try

Try it on [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-msdndysd?file=app.scss).

## Usage

::: code-group
```scss
@use "@magnesium/theme";

$theme: (
    "text-color": darkcyan
);

.foo {
    @include theme.emit-custom-props($theme, "button");
}
```

```css
.foo {
    --mg-button-text-color: darkcyan;
}
```
:::
