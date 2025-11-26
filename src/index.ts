export type Task<T> = () => Promise<T>;

/**
 * Runs a list of async tasks with a concurrency limit.
 *
 * @template T - The type of data returned by the tasks.
 * @param {Task<T>[]} tasks - Array of functions that return promises.
 * @param {number} limit - Maximum number of concurrent tasks (default 1).
 * @returns {Promise<(T | null)[]>} - Array of results (null if a task failed).
 */
export async function runWithLimit<T>(tasks: Task<T>[], limit: number = 1): Promise<(T | null)[]> {
  if (!Array.isArray(tasks)) throw new TypeError('tasks must be an array');
  if (typeof limit !== 'number' || limit < 1) limit = 1;

  const results = new Array<T | null>(tasks.length);
  const executing = new Set<Promise<unknown>>();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // Normalize the promise to handle success/failure safely
    const taskPromise = Promise.resolve()
      .then(() => task())
      .then((value) => ({ index: i, value, error: null }))
      .catch((error) => ({ index: i, value: null, error }));

    // Create a wrapper that cleans itself up from the Set
    const wrapper = taskPromise.finally(() => {
      executing.delete(wrapper);
    });

    executing.add(wrapper);

    // Handle the result storage
    taskPromise.then(({ index, value, error }) => {
      if (error) {
        console.error(`Task ${index} failed:`, error);
        results[index] = null;
      } else {
        results[index] = value as T;
      }
    });

    // Wait if limit is reached
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  // Wait for the remaining tasks
  await Promise.all(executing);
  return results;
}

export default runWithLimit;
