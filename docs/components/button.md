# Button

A button rendered in the **native navigation bar**. The web side registers a
title; iOS draws a `UIBarButtonItem`; every tap is relayed back to the web side.

Outside of Hotwire Native nothing is registered and your own markup is rendered
instead, so the same page still works in a regular browser.

<video src="/media/button-ios.mp4" autoplay muted loop playsinline controls style="max-width: 320px; width: 100%; border-radius: 12px;"></video>

*Opening the page registers `Tap me` in the navigation bar; each tap is counted
by the web page below it.*

::: tip You copy it, you own it
There is nothing to install. Both files below are the complete component — paste
them into your app and change them however you like. They are shown straight
from the
[hotwire-bridge-components](https://github.com/zumkorn/hotwire-bridge-components/tree/main/registry/button)
registry, so what you see here is what the registry holds.
:::

## Web side

Save this as `bridge/BridgeButton.tsx` in your app:

::: code-group

<<< @/../vendor/hotwire-bridge-components/registry/button/inertia/react.tsx [BridgeButton.tsx]

:::

Then use it as a component. It renders nothing when the native button is
showing, and renders its children as the web fallback when it is not:

```jsx
import { BridgeButton } from '@/bridge/BridgeButton'

function Article({ onSave }) {
  return (
    <>
      <BridgeButton title="Save" onTap={onSave}>
        <button type="button" onClick={onSave}>Save</button>
      </BridgeButton>

      {/* … */}
    </>
  )
}
```

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `title` | `string` | — | Label on the native button |
| `side` | `'left' \| 'right'` | `'right'` | Which end of the navigation bar |
| `onTap` | `() => void` | — | Called on every tap |
| `children` | `ReactNode` | — | Web fallback, rendered only in a browser |

The file is TypeScript. Vite compiles `.tsx` with no configuration change, even
in a project that is otherwise plain `.jsx` — types are stripped by esbuild.
Without `typescript` and a `tsconfig.json` they are not checked, only removed.

## iOS side

Add this file to your Xcode project:

::: code-group

<<< @/../vendor/hotwire-bridge-components/registry/button/native/ButtonComponent.swift [ButtonComponent.swift]

:::

Then register it at launch, in `AppDelegate`:

```swift
Hotwire.registerBridgeComponents([
    ButtonComponent.self,
    // … your other components
])
```

Until it is registered, `supported` stays false on the web side and only the
fallback is rendered.

::: warning Minimum SDK
The Swift component requires **`hotwire-native-ios` 1.2.0 or newer**. In 1.2.0
`BridgeComponent.delegate` became a weak optional; the component reaches its
view controller through `delegate?.destination`, which does not compile against
1.1.x.
:::

The component overrides `name` as `override nonisolated class var name`. The
base declaration is `nonisolated`, so an app built with
`SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` — the Xcode 26 default for new
projects — rejects a plain `override class var name` as an actor-isolation
mismatch.

## The contract

Component name: `button`.

### `connect` — web → native

Registers or re-registers the bar button. Sent on connect and whenever the title
or side changes.

```jsonc
{
  "title": "Save",   // string, required — button label
  "side": "right"    // "left" | "right", optional, default "right"
}
```

### `connect` reply — native → web

Native **replies to the same `connect` message** every time the button is
tapped. There is no separate tap event — the reply *is* the tap signal, and it
arrives once per tap rather than once per registration.

Because a reply can arrive many times, re-registering without dropping the
previous callback makes each tap fire twice. The registry component handles this;
see [Callback lifetime](/components/overview#callback-lifetime) if you write your
own.

## Android

Not covered here yet. The registry ships a `ButtonComponent.kt`, but it has not
been verified against a pinned Android SDK version — treat it as unversioned
until it has.
