# Navigation

Once [`initHotwireNative()`](/reference/api#inithotwirenative) is called, every
Inertia navigation is mapped onto the native navigation stack. You don't change
how you write Inertia links or visits — the shim translates them.

## What's handled

| Behavior | How it maps natively |
| --- | --- |
| Link tap (`<Link>` / `router.visit`) | Cancelled in the web view; the native side presents the destination (push / modal). |
| `replace: true` visits | Replaces the current native screen instead of pushing. |
| Back / restore | Restores the cached page from Inertia's history (no re-fetch); falls back to a fresh request if there's no cached entry. |
| Form submissions (non-GET) | Stay in the web view; the native side is notified via form-submission events. |
| HTTP errors (404 / 500) & network failures | Surface the native error screen for the failed visit. |
| Pull-to-refresh | Treated as an in-place reload of the current URL. |

## Modals

A visit presented as a modal is driven by your native path configuration
(Hotwire Native's `path-configuration` JSON), not by the package — the package
just proposes the visit and reports its lifecycle. See the native setup guides.

## Debugging

Pass `debug: true` to `initHotwireNative()` to log the web ↔ native message flow
to the web view console. Attach Safari Web Inspector (iOS) or Chrome remote
inspect (Android) to read it.

```js
initHotwireNative({ debug: true })
```

Next: [Bridge components](/guide/bridge-components).
