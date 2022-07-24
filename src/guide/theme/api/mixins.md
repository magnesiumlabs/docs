---
outline: deep
---

# Mixins

## `core-styles()`

## `property($property, $value, $important)`

Sets color system property, with optional `!important`. The value may be a standard CSS value or one of configured theme
token.

### CSS custom properties declaration

Sets default CSS custom properties declaration.

#### Sass

```scss
@use "@magnesium/theme";

.foo {
    @include theme.property(primary);
}
```

#### CSS

```css
.foo {
    --mg-theme-primary: #2674a2;
}
```

### Override default CSS custom properties declaration

Sets default CSS custom properties' declaration with new value.

#### Sass

```scss
@use "@magnesium/theme";

.foo {
    @include theme.property(primary, darkcyan);
}
```

#### CSS

```css
.foo {
    --mg-theme-primary: darkcyan;
}
```

### Valued CSS custom properties

Sets default CSS custom properties value with fallback.

#### Sass

```scss
@use "@magnesium/theme";

.foo {
    @include theme.property(color, primary);
}
```

#### CSS

```css
.foo {
    color: var(--mg-theme-primary, #2674a2);
}
```

## `prefers-color-scheme($scheme, $tokens: (), $root: false)`

Sets `prefers-color-scheme()` media feature for `light` or `dark` system mode.

#### Sass

```scss
@use "@magnesium/theme";

@include theme.prefers-color-scheme {
    --mg-theme-primary: #2674a2;
}

@include theme.prefers-color-scheme(dark) {
    --mg-theme-primary: #6e5898;
}
```

#### CSS

```css
@media (prefers-color-scheme: light) {
    :root {
        --mg-theme-primary: #2674a2;
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --mg-theme-primary: #6e5898;
    }
}
```

### `$tokens` map

You can use a `$tokens` map to more easily manage the color system tokens.

#### Sass

```scss
@use "@magnesium/theme";

@include theme.prefers-color-scheme($tokens: (
    primary: #080,
    secondary: #800
));
```

#### CSS

```css
@media (prefers-color-scheme: light) {
    :root {
        --mg-theme-primary: #080;
        --mg-theme-secondary: #800;
    }
}
```

### Custom selector

You can disable `:root` option and use you own selector.

#### Sass

```scss
@use "@magnesium/theme";

@include theme.prefers-color-scheme($root: false) {
    .foo {
        --mg-theme-primary: #2674a2;
    }
}
```

#### CSS

```css
@media (prefers-color-scheme: light) {
    .foo {
        --mg-theme-primary: #2674a2;
    }
}
```
