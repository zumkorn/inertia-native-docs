# Introduction

[`inertia-hotwire-native`](https://www.npmjs.com/package/inertia-hotwire-native)
lets an [Inertia.js](https://inertiajs.com) application run inside
[Hotwire Native](https://native.hotwired.dev) (iOS & Android) and behave like a
native app.

::: warning Beta & unofficial
This is a pre-1.0, community-built integration. It is **not** an official
Inertia.js or Hotwire project, and the API may still change between beta
releases.
:::

## How it works

Hotwire Native injects a `turbo.js` script into every web view that expects a
`window.Turbo` object to drive. This package installs a small shim that maps the
native adapter protocol onto Inertia's router, so Inertia pages push, pop, and
restore as native screens — plus a web bridge so Inertia pages can use native
bridge components (submit buttons, menus, etc.).

In a regular browser it stays inert: with no native adapter connected, Inertia
navigates exactly as usual.

## Two entry points

- **Framework-agnostic core** (`inertia-hotwire-native`) — peer-depends on
  `@inertiajs/core`. Handles all navigation.
- **React bindings** (`inertia-hotwire-native/react`) — optional, peer-depends
  on `react`. Provides `useBridgeComponent` for bridge components.

## The ecosystem

| Repository | What it is |
| --- | --- |
| [inertia-hotwire-native](https://github.com/zumkorn/inertia-hotwire-native) | The npm package |
| [inertia-native-demo](https://github.com/zumkorn/inertia-native-demo) | Web / Rails demo app |
| [inertia-native-ios-demo](https://github.com/zumkorn/inertia-native-ios-demo) | iOS Hotwire Native shell |
| [inertia-native-android-demo](https://github.com/zumkorn/inertia-native-android-demo) | Android Hotwire Native shell |

Next: [Installation](/guide/installation).
