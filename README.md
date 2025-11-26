# async-run-limit

[![npm version](https://img.shields.io/npm/v/async-run-limit.svg?style=flat-square)](https://www.npmjs.com/package/async-run-limit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

A lightweight, type-safe, and robust utility to execute an array of asynchronous tasks with a strict concurrency limit.

Designed for modern web development, it uses `Set` for **O(1)** performance, handles hybrid **ESM/CJS** environments, and provides first-class **TypeScript** support.

## Features

- 🚀 **Strict Concurrency:** Limits active promises to prevent resource exhaustion (API rate limits, DB pools).
- 🛡️ **Crash Proof:** Safely handles both synchronous errors and asynchronous rejections.
- 📦 **Type Safe:** Written in TypeScript with full Generic support (`<T>`).
- ⚡ **Zero Dependencies:** Pure JavaScript/TypeScript.
- 🌐 **Universal:** Works in Node.js (18+), Browsers, Deno, and Bun.

## Installation

```bash
npm install async-run-limit
```

## Usage

### 1. TypeScript / ES Modules (Recommended)

```typescript
import { runWithLimit } from 'async-run-limit';

// 1. Define your tasks (Functions that return a Promise)
// Note: Do not call the function immediately! Pass the function definition.
const tasks = [
  () => fetch('https://api.example.com/1').then((r) => r.json()),
  () => fetch('https://api.example.com/2').then((r) => r.json()),
  () => fetch('https://api.example.com/3').then((r) => r.json()),
];

// 2. Run with a limit of 2 concurrent requests
const results = await runWithLimit(tasks, 2);

console.log(results);
// Output: [{ id: 1... }, { id: 2... }, null]
// (If a task fails, it returns null instead of throwing)
```

### 2. CommonJS (Legacy Node.js)

```javascript
const { runWithLimit } = require('async-run-limit');

const tasks = [() => Promise.resolve('A'), () => Promise.resolve('B')];

runWithLimit(tasks, 1).then(console.log);
```

## API Reference

### `runWithLimit<T>(tasks, limit)`

| Parameter | Type                      | Default      | Description                                                                                                                            |
| :-------- | :------------------------ | :----------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `tasks`   | `Array<() => Promise<T>>` | **Required** | An array of **functions** (factories) that return a Promise. <br>⚠️ **Do not pass direct Promises**, or they will execute immediately! |
| `limit`   | `number`                  | `1`          | The maximum number of tasks to run simultaneously.                                                                                     |

**Returns:** `Promise<(T | null)[]>`

- Returns an array containing the resolved values.
- If a task fails (throws or rejects), its slot in the array will be `null`.
- The order of results matches the order of the input `tasks` array.

## Development

If you want to contribute to this project:

```bash
# 1. Clone repo
git clone https://github.com/johnsonkit/async-run-limit.git

# 2. Install dependencies
npm install

# 3. Run tests (Watch mode)
npm run dev

# 4. Build package
npm run build
```

## License

MIT
