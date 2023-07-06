# Configuration

Without configuration, Magnesium will be generated with default configuration. To customize Magnesium, you can use many
options describe below.

## Options

| Option    | Type             | Description                                                                  | Default |
|-----------|------------------|------------------------------------------------------------------------------|---------|
| `$prefix` | `string/boolean` | Add global prefix name on any custom properties. Set to `false` for disable. | `mg`    |

#### Example

```scss
@use "@magnesium/theme" with (
    $prefix: "foo"
);
```

## Top-level override

If variables are already configured on top-level using `@use ... with`, by another dependency for example, you can't use
this solution anymore, because the module can only be setup once, this is a Sass restriction with **Module System**, but
another solution exist for override the main configuration, with a dedicated mixin!

| Mixin             | Description                                |
|-------------------|:-------------------------------------------|
| `config($prefix)` | Override top-level `prefix` configuration. |

#### Example

The following Sass will configure new parameters:

```scss
@use "@magnesium/theme";

@include theme.config("fr");
```

:::tip
See the Sass [official documentation](https://sass-lang.com/documentation/at-rules/use#with-mixins) about override
configuration with mixins.
:::
