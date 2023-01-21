# What is this?

A library providing a parametrized random delay mechanism for functions (Both async and sync)

## How do I install it?

You can install it by using the following command:

```bash
npm install random-delay
```

## How do I use it?

Both sync and async functions are supported.  
The library provides a `randomDelay` function that takes 3 parameters:
- `minDelay`: The minimum delay in milliseconds. Defaults to `0`.
- `maxDelay`: The maximum delay in milliseconds. Defaults to `1000`.
- `method`: The method to use. Can be either `sync` or `async`. Defaults to `sync`.

### Sync

The library uses the [`event-loop-sleep`](https://github.com/Cadienvan/event-loop-sleep) library to sleep the event loop using `SharedArrayBuffer` and `Atomics` for sync functions.

```javascript
const { randomDelay } = require('random-delay');

// Do something before...
randomDelay(1000, 2000, 'sync');
// Do something after...
```

### Async

The library uses a simple `setTimeout` (unrefed) for async functions.

```javascript
const { randomDelay } = require('random-delay');

// Do something before...
await randomDelay(1000, 2000, 'async');
// Do something after...
```

### randomDelayed

The library also provides a `randomDelayed`, a higher-order function that takes 2 parameters:
- `fn`: The function to wrap.
- `options`: The options to pass to `randomDelay`. Defaults to the same as `randomDelay`.

```javascript
const { randomDelayed } = require('random-delay');

// Do something before...
await randomDelayed(() => {
  // Do something
}, { minDelay: 1000, maxDelay: 2000, method: 'async' });
// Do something after...
```

# Tests

You can run the tests by using the following command:

```bash
npm test
```

# Contributing

If you want to contribute to this project, please open an issue or a pull request.  
I will be happy to review it and merge it if it's useful.  
Please, remember to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.  
