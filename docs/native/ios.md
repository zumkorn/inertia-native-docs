# iOS

The native iOS shell is a standard [Hotwire Native iOS](https://native.hotwired.dev/ios/overview)
app that loads your Inertia application in a web view. The package handles the
web side; the iOS app provides the navigation stack, path configuration, and any
bridge components.

::: tip Reference app
A runnable example lives in
[inertia-native-ios-demo](https://github.com/zumkorn/inertia-native-ios-demo).
Clone it to see a working setup end to end.
:::

## Outline

1. Create a Hotwire Native iOS app and add the SDK via Swift Package Manager.
2. Point its `Navigator` at your app's URL.
3. Add a `path-configuration` JSON to control which routes present as modals,
   pushes, etc.
4. Register the bridge components your web pages use (`form`, `menu`, …) if any.

::: info Work in progress
A full step-by-step walkthrough is being written. For now, the demo app is the
source of truth.
:::
