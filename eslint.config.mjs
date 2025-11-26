import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 1. GLOBAL IGNORES
  {
    ignores: ['dist/', 'coverage/', 'node_modules/'],
  },

  // 2. Base JS rules
  eslint.configs.recommended,

  // 3. TypeScript rules
  ...tseslint.configs.recommended,

  // 4. Prettier config
  prettierConfig,

  // 5. Global Settings
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
