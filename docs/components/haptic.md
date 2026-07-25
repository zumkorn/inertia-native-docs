# Haptic

**Native haptic feedback** — a tap you feel rather than see. The web side asks
for a feedback type; iOS plays it through `UINotificationFeedbackGenerator` and
Android through `View.performHapticFeedback`.

Outside of Hotwire Native the hook falls back to `navigator.vibrate` where the
browser has it, and does nothing where it does not.

::: tip No video on this page
Every other component page shows a screen recording. This one cannot — haptics
are invisible, and simulators and emulators do not vibrate at all. Run the demo
app on a real device to feel it.
:::

::: tip You copy it, you own it
There is nothing to install. The files below are the complete component — paste
the web one plus whichever platforms you ship into your app, and change them
however you like. They are shown straight from the
[hotwire-bridge-components](https://github.com/zumkorn/hotwire-bridge-components/tree/main/registry/haptic)
registry, so what you see here is what the registry holds.
:::

## Web side

Save this as `bridge/useBridgeHaptic.tsx` in your app:

::: code-group

<<< @/../vendor/hotwire-bridge-components/registry/haptic/inertia/react.tsx [useBridgeHaptic.tsx]

:::

Then call `vibrate` wherever something worth feeling happens:

```jsx
import { useBridgeHaptic } from '@/bridge/useBridgeHaptic'

function SaveButton({ onSave }) {
  const { vibrate } = useBridgeHaptic()

  const save = async () => {
    try {
      await onSave()
      vibrate('success')
    } catch {
      vibrate('error')
    }
  }

  return <button type="button" onClick={save}>Save</button>
}
```

| Argument | Type | Default | Purpose |
| --- | --- | --- | --- |
| `feedback` | `'success' \| 'warning' \| 'error'` | `'success'` | Which feedback to play |

`useBridgeHaptic()` also returns `supported`, for a page that wants to hide a
control that would do nothing.

::: tip The cheapest component here
Native never replies, so no callback is ever registered and there is nothing to
clean up — unlike [Alert](/components/alert) and [Button](/components/button),
where a reply arrives and the callback has to be managed. If you write your own
web side for this one, `send` and forget.
:::

## iOS side

Add this file to your Xcode project:

::: code-group

<<< @/../vendor/hotwire-bridge-components/registry/haptic/native/HapticComponent.swift [HapticComponent.swift]

:::

Then register it at launch, in `AppDelegate`:

```swift
Hotwire.registerBridgeComponents([
    HapticComponent.self,
    // … your other components
])
```

## The contract

Component name: `haptic`.

### `vibrate` — web → native

Plays one piece of feedback. Fire-and-forget.

```jsonc
{
  "feedback": "success"   // "success" | "warning" | "error", optional
}
```

There is no reply. Nothing comes back because nothing needs to — the feedback
either played or the device cannot play it, and neither changes what the web
side does next.

::: warning An unknown type still plays
Native must not drop a `feedback` it does not recognise; it plays `success`
instead. That way a page built against a newer contract keeps working against an
older app, which is the same additive rule every component here follows.
:::

`feedback` is a *category*, not a waveform. What each one feels like is the
native side's choice and differs between platforms — do not build web-side logic
that assumes a duration or an intensity.

## Android

The Kotlin half uses `View.performHapticFeedback`, so it needs no `VIBRATE`
permission and respects the device's own haptic settings. Add this file to your
project:

::: code-group

<<< @/../vendor/hotwire-bridge-components/registry/haptic/native/HapticComponent.kt [HapticComponent.kt]

:::

Then register it at launch, in your `Application`:

```kotlin
Hotwire.registerBridgeComponents(
    BridgeComponentFactory("haptic", ::HapticComponent),
    // … your other components
)
```

::: warning Three types, two constants
Android has no direct equivalent of iOS's success/warning/error triple.
`CONFIRM` and `REJECT` cover success and error from API 30 onwards; below that,
and for `warning` on every version, the component falls back to constants that
have always existed. Expect the three to feel less distinct than they do on iOS.
:::

## Why you might feel nothing

In rough order of likelihood:

- **A simulator or emulator.** Neither vibrates, ever.
- **System haptics are off**, or the iPhone is in Low Power Mode, which
  suppresses them.
- **The native half is not registered** — then `supported` is false on the web
  side and the call goes to `navigator.vibrate`, which desktop and iOS Safari do
  not have.

Log the message on the native side to tell the first two apart from the third.
