# Theme

The theme component help you to easily manage theme styles with generate CSS custom properties declarations from
user-provided theme's tokens map.

## Functions

### `validation($reference, $tokens)`

Validates a user-provided theme's token and throws an error if tokens are invalid. Return error if token key doesn't
exist or the map.

**Parameters**

| Parameter    | Description                           | Default     |
|--------------|---------------------------------------|-------------|
| `$reference` | The reference theme's tokens map.     | `undefined` |
| `$tokens`    | The user-provided theme's tokens map. | `undefined` |

**Usage**

```scss
@use "@magnesium/theme";

$reference: (
    "text-color": darkcyan
);

$tokens: (
    "text-color": darkorange
);

$theme: theme.validation($reference, $tokens);
// Will return map is `true` or error message if `false`.
```

### `emit-variable($theme, $token, $fallback, $prefix)`

Emits CSS variable declaration from a user-provided theme's.

**Parameters**

| Parameter   | Description                                                           | Default     |
|-------------|-----------------------------------------------------------------------|-------------|
| `$theme`    | The reference theme's tokens map.                                     | `undefined` |
| `$token`    | The theme token key.                                                  | `undefined` |
| `$fallback` | Allow to display the CSS variable fallback.                           | `false`     |
| `$prefix`   | Token's prefix name to prepend for each token's custom property name. | `null`      |

**Usage**

```scss
@use "@magnesium/theme";

$theme: (
    "text-color": darkcyan
);

.foo {
    color: theme.emit-variable($theme, "text-color", false, "button");
}
```

**Returns**

```scss
.foo {
    color: var(--mg-button-text-color);
}

// ...or with fallback option at `true`...

.foo {
    color: var(--mg-button-text-color, darkcyan);
}
```

### `create-theme-vars($theme, $prefix)`

Transforms a user-provided theme's tokens map values into a `var()` custom properties.

**Parameters**

| Option    | Description                                                                                     |
|-----------|-------------------------------------------------------------------------------------------------|
| `$theme`  | The user-provided theme tokens map.                                                             |
| `$prefix` | Component's name to prepend for each token's custom property name. Set to `false` for disabled. |

**Usage**

```scss
@use "@magnesium/theme";

$tokens: (
    "text-color": darkcyanz
);

$theme: theme.create-theme-vars($tokens, "button");
```

**Returns**

```scss
$theme: (
    "text-color": var(--mg-button-text-color, darkcyan)
);
```

## Mixins

_Coming soon..._
