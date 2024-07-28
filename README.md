# Zignalz

`zignalz` is a basic fully-typed implementation of the signal pattern in TypeScript.

## Installation

```bash
npm install zignalz
```

## Signal concept

A signal is a value that can change over time and automatically infer and trigger who ever using it.

### Mechanism

The signal (method/class) exposes two methods: get and set, other than that, to allow observation of the signal value
we initialize a new list that will contain all the signal observers, and an observe function.

The observe method takes a callback, adding the callback to the observer list, triggers the cb, and then
deletes the observer from the list.

And that's practically it...

### How the magic happens?

The observe method creates an automatic dependency tracking, and when the signal value changes,
it triggers all the observers which will use the updated value.

### Example

In this example, we have a signal that contains a count and a name and a render function that will render the app
every time the signal value changes.

```ts
import { createSignal, observe } from 'zignalz';

export const { get, set } = new createSignal({ count: 0 });

const init = () => {
  const render = () => {
    renderApp();
  };

  observe(render);
};

const renderApp = () => {
  const { count, name } = get();

  document.body.innerHTML = `
        <h1>${name}</h1>
        <p>${count}</p>
        <button onclick="set({count: ${count + 1}})">Increment</button>
    `;
};

init();
```
