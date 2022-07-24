---
outline: deep
---

# Getting Started

The Magnesium Design color system help you to create a color scheme who reflects your brand or style.

## Installing

Add color system as dependencies for your project.

```shell
npm install @magnesium/theme
```

## Basic usage

Add main styles to your project.

```scss
@use "@magnesium/theme/styles";
```

#### Sass

```scss
@use "@magnesium/theme" with (
    $colors: (
        primary: #2674a2,
        secondary: #6e5898
    )
);
```

#### CSS

```css
.mg-theme--primary {
    color: var(--mg-theme-primary, #2674a2);
}

.mg-theme--secondary {
    color: var(--mg-theme-secondary, #6e5898);
}
```
