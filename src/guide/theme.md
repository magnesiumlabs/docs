# Theme

The theme component help you to easily manage theme styles with generate CSS custom properties declarations from
user-provided theme's tokens map.

## Usage

### Import

```scss
@use "@magnesium/framework/theme";
```

## `create-theme-vars($theme, $prefix)`

Transforms a user-provided theme's tokens map values into a `var()` custom properties.

#### Options

| Option    | Description                                                                                     |
|-----------|-------------------------------------------------------------------------------------------------|
| `$theme`  | The user-provided theme tokens map.                                                             |
| `$prefix` | Component's name to prepend for each token's custom property name. Set to `false` for disabled. |

#### Example

```scss
@use "@magnesium/framework/theme";

$theme: (
    "text-color": darkcyan
);

$theme: theme.create-theme-vars($theme, "button");

/// Result.
$theme: (
    "text-color": var(--mg-button-text-color, darkcyan)
);
```

## `validate-theme($reference, $tokens)`

Validates a user-provided theme's token and throws an error if tokens are invalid. Return error if token key doesn't
exist or the map.

#### Options

| Option       | Description                           |
|--------------|---------------------------------------|
| `$reference` | The reference theme's tokens map.     |
| `$tokens`    | The user-provided theme's tokens map. |

#### Example

```scss
@use "@magnesium/framework/theme";

$theme-reference: (
    "text-color": darkcyan
);

$theme: (
    "text-color": darkorange
);

$theme: theme.validate-theme($theme-reference, $theme);
$theme: theme.create-theme-vars($theme, "button");

/// Result.
$theme: (
    "text-color": var(--mg-button-text-color, darkorange)
);
```
