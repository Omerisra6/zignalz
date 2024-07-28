# Zignalz

`zignalz` is a basic fully-typed implementation of the signal pattern in TypeScript.

## Installation

```bash
npm install zignalz
```

## Signal concept

A signal is a value that can change over time and automatically infer and trigger who ever using it.

### Mechanism

The signal (method/class) exposes two methods: get and set, other than that, to allow observation
we also have the observe method.

The observe method takes a callback, saving it in, triggers the cb, and then
deletes the observer.

And that's practically it...

### How the magic happens?

The observe method creates an automatic dependency tracking, and when the signal value changes,
it triggers all the observers that are observing the signal.

### Example

In this example, we have a signal that contains a counter.
We have a function that increments the counter and a function that observes the counter value.
The observer re-renders the counter value every time it changes.

```typescript
import { Signal } from 'zignalz';

const counter = new Signal(0);

const increment = () => {
    counter.set( counter.get() + 1 );
};

const counterElement = document.getElementById('counter'); 

const observer = () => {
    counterElement.innerText = counter.get().toString();
};

observe( observer );

increment(); // counterElement.innerText = 1
```




