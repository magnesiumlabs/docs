---
outline: deep
---

# Functions

## `get-color($token)`

Get theme color value form token name, without custom property.

#### Sass

```scss
@use "@magnesium/theme";

.foo {
    color: theme.get-color(primary);
}
```

#### CSS

```css
.foo {
    color: #2674a2;
}
```

## `get-keys()`

Return list of current theme token keys.

#### Sass

```scss
@use "@magnesium/theme";

$tokens: theme.get-keys();

//
//  $tokens: (
//    primary,
//    secondary,
//    etc...
//  )
//
```
