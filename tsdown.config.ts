import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'], // Output both CommonJS (CJS) and ES Modules (ESM)
  dts: true, // Generate .d.ts type definitions automatically
  clean: true, // Clean dist folder before building
  target: 'es2022', // Target ES2022 for run ANYWHERE that speaks modern JavaScript
});
