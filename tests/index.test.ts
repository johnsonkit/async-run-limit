import { describe, it, expect } from 'vitest';
import { runWithLimit } from '../src/index';

const delay = <T>(ms: number, value: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

describe('runWithLimit', () => {
  it('should return results in order', async () => {
    const tasks = [() => delay(10, 'A'), () => delay(20, 'B'), () => delay(5, 'C')];
    const results = await runWithLimit(tasks, 2);
    expect(results).toEqual(['A', 'B', 'C']);
  });

  it('should handle errors as null', async () => {
    const tasks = [() => Promise.resolve('Success'), () => Promise.reject(new Error('Fail'))];
    const results = await runWithLimit(tasks, 2);
    expect(results).toEqual(['Success', null]);
  });
});
