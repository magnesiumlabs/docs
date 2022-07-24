---
outline: deep
---

# Configuration

Without any configuration, the color system classes will be generated with default configuration. To customize your
theme, you can use many options describe below.

## Options

### `$colors`

You can define the theme color variables before importing any components:

```scss
@use "@magnesium/theme" with (
    $colors: (
        primary: #2674a2,
        secondary: #6e5898
    )
);
```

::: tip
Each token will be used to generate the names of custom properties and default classes of the color system.
:::
