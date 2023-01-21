import sleep from 'event-loop-sleep';

export type Options = {
  minDelay?: number;
  maxDelay?: number;
  method: string;
};

const defaultOptions = {
  minDelay: 0,
  maxDelay: 1000,
  method: 'async'
};

export function randomDelay(options: Partial<Options> = {}) {
  const { minDelay, maxDelay, method } = { ...defaultOptions, ...options };
  if (method !== 'sync' && method !== 'async')
    throw new Error("randomDelay method must be 'sync' or 'async'");
  if (minDelay < 0 || maxDelay < 0)
    throw new Error('randomDelay minDelay and maxDelay must be >= 0');
  if (minDelay > maxDelay)
    throw new Error('randomDelay minDelay must be <= maxDelay');

  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  if (options.method === 'sync') {
    sleep(delay);
    return true;
  } else {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
}

export function randomDelayed(
  fn: (...args) => any,
  options: Options = defaultOptions
) {
  if (options.method === 'sync')
    return (...args) => {
      randomDelay(options);
      return fn(...args);
    };
  else
    return async (...args) => {
      await randomDelay(options);
      return fn(...args);
    };
}
