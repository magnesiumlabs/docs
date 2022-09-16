---
outline: deep
---

# @magnesium/core

The Magnesium Design core system.

## Installing

```shell
npm install @magnesium/core
```

## Usage

You can extend default options before importing any Magnesium components:

```scss
@use "@magnesium/core" with (
    $extend: (
        // ...
    )
);
```

## Options

### Prefix

The `prefix` allow to generate all classes and custom properties with custom prefix. For example, you could set the
`prefix` option to `foo` like that:

```scss
@use "@magnesium/core" with (
    $extend: (
        "prefix": "foo"       
    )
);
```

### Screens

The `screens` allow to set token rules for media queries.

```scss
@use "@magnesium/core" with (
    $extend: (
        "screens": (
            "lg": 1024px
        )
    )
);
```

#### Media queries

| Token | Value    |
|-------|----------|
| `xs`  | `360px`  |
| `sm`  | `480px`  |
| `md`  | `768px`  |
| `lg`  | `960px`  |
| `xl`  | `1200px` |
| `2xl` | `1400px` |

::: info Breakpoint
This option is based and use [@unsass/breakpoint](https://github.com/unsass/breakpoint) external dependency.
:::

## Core

The `core` section is where you configure Magnesium global behavior, like media queries breakpoints.

### Responsive

_Coming soon..._

### States

_Coming soon..._
