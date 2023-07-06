# Mixins

The Magnesium mixins help you to easily manage theme styles from ,user-provided theme's tokens map.

## `emit-custom-props($theme, $prefix)`

Emits CSS custom properties declarations from a user-provided theme's.

#### Parameters

| Parameter | Description                                                           | Default     |
|-----------|-----------------------------------------------------------------------|-------------|
| `$theme`  | The reference theme's tokens map.                                     | `undefined` |
| `$prefix` | Token's prefix name to prepend for each token's custom property name. | `null`      |

#### Usage

```scss
@use "@magnesium/theme";

$theme: (
    "text-color": darkcyan
);

.foo {
    @include theme.emit-custom-props($theme, "button");
}
```

#### Returns

```scss
.foo {
    --mg-button-text-color: darkcyan;
}
```

## `emit-color-scheme($scheme)`

Emits CSS media feature `prefers-color-scheme` declarations.

#### Parameters

| Parameter | Description                                         | Default |
|-----------|-----------------------------------------------------|---------|
| `$scheme` | The color scheme. Choose between `light` or `dark`. | `light` |

#### Usage

```scss
@use "@magnesium/theme";

@include theme.emit-color-scheme("light") {
    :root {
        --mg-button-text-color: darkcyan;
    }
}
```

#### Returns

```scss
@media (prefers-color-scheme: light) {
    :root {
        --mg-button-text-color: darkcyan;
    }
}
```

## `emit-theme-vars($theme)`

Emits CSS media feature `prefers-color-scheme` declarations.

#### Parameters

| Parameter | Description                                         | Default |
|-----------|-----------------------------------------------------|---------|
| `$scheme` | The color scheme. Choose between `light` or `dark`. | `light` |

#### Usage

```scss
@use "@magnesium/theme";

$theme: (
    "text-color": darkcyan
);

$theme: theme.create-theme-vars($theme, "button");

.foo {
    @include theme.emit-theme-vars($theme);
}
```

#### Returns

```scss
.foo {
    --mg-button-text-color: darkcyan;
}
```
