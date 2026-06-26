# Bridge components

Bridge components let your web pages drive native UI — a submit button in the
app bar, a native menu, and so on. They build on Hotwire Native's bridge, which
this package re-implements on the web side as `window.HotwireNative.web`.

## `useBridgeComponent`

The React entry exposes one generic primitive:

```js
import { useBridgeComponent } from 'inertia-hotwire-native/react'
```

It returns whether the connected native app supports a component and a stable
`send`:

```jsx
function NativeMenu({ items, onSelect }) {
  const { supported, send } = useBridgeComponent('menu')
  if (!supported) return null

  return (
    <button
      onClick={() =>
        send('connect', { items }, (message) => onSelect(message.data.index))
      }
    >
      Open menu
    </button>
  )
}
```

- `supported` re-checks when the native handshake completes after mount.
- `send(event, data?, callback?)` returns a message id; native replies invoke
  the `callback`.

## Building a form submit button

`useBridgeComponent` is the building block for specific components. A common one
is a native submit button wired to an Inertia form — implement it in your app on
top of the primitive:

```js
// hooks/useBridgeForm.js
import { useEffect, useRef } from 'react'
import { useBridgeComponent } from 'inertia-hotwire-native/react'

export function useBridgeForm({ submitTitle, processing, onSubmit }) {
  const { supported, send } = useBridgeComponent('form')
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  useEffect(() => {
    if (!supported) return
    const id = send('connect', { submitTitle }, () => onSubmitRef.current?.())
    return () => window.HotwireNative?.web?.removeCallback(id)
  }, [supported, submitTitle, send])

  useEffect(() => {
    if (!supported) return
    send(processing ? 'submitDisabled' : 'submitEnabled')
  }, [supported, processing, send])

  return { supported }
}
```

Usage:

```jsx
import { useForm } from '@inertiajs/react'
import { useRef } from 'react'
import { useBridgeForm } from '@/hooks/useBridgeForm'

function NewResource() {
  const form = useForm({ name: '' })
  const formRef = useRef(null)

  const { supported } = useBridgeForm({
    submitTitle: 'Submit',
    processing: form.processing,
    onSubmit: () => formRef.current?.requestSubmit(),
  })

  return (
    <form ref={formRef} onSubmit={(e) => { e.preventDefault(); form.post('/resources') }}>
      <input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
      {!supported && <button type="submit">Submit</button>}
    </form>
  )
}
```

The native app must register the matching bridge component (`form`, `menu`, …)
for `supported` to be true. See the native setup guides.
