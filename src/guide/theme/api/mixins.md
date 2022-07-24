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

## `prefers-color-scheme($scheme)`

Sets `prefers-color-scheme()` media feature for `light` or `dark` system mode.

#### Sass

```scss
@use "@magnesium/theme";

@include theme.prefers-color-scheme {
    :root {
        --mg-theme-primary: #2674a2;
    }
}

@include theme.prefers-color-scheme(dark) {
    :root {
        --mg-theme-primary: #6e5898;
    }
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
