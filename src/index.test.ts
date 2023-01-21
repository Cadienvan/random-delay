import { randomDelay } from './index';
import { performance } from 'perf_hooks';

describe('throws', function () {
  it('should throw if method is not sync or async', function () {
    expect(() => randomDelay({ method: 'foo' })).toThrow();
  });
  it('should throw if minDelay is negative', function () {
    expect(() => randomDelay({ minDelay: -1 })).toThrow();
  });
  it('should throw if maxDelay is negative', function () {
    expect(() => randomDelay({ maxDelay: -1 })).toThrow();
  });
  it('should throw if minDelay > maxDelay', function () {
    expect(() => randomDelay({ minDelay: 1000, maxDelay: 500 })).toThrow();
  });
});

describe('sync', function () {
  it('should wait for randomDelay', function (done) {
    const now = performance.now();
    const options = {
      minDelay: 1000,
      maxDelay: 2000,
      method: 'sync'
    };
    randomDelay(options);
    expect(performance.now()).toBeGreaterThan(now + options.minDelay);
    done();
  });
});

describe('async', function () {
  it('should wait for randomDelay', async function () {
    const now = performance.now();
    const options = {
      minDelay: 1000,
      maxDelay: 2000,
      method: 'async'
    };
    await randomDelay(options);
    expect(performance.now()).toBeGreaterThan(now + options.minDelay);
  });
});
