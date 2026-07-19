import eslint from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/coverage/**', 'node_modules/**', 'playwright-report/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'apps/api/vitest.config.ts',
            'apps/web/vitest.config.ts',
            'services/worker/vitest.config.ts',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { 'import-x': importX, promise },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      'import-x/no-cycle': ['error', { ignoreExternal: true }],
      'import-x/no-duplicates': 'error',
      'promise/always-return': 'off',
      'promise/catch-or-return': 'error',
    },
  },
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'tests/**/*.ts'],
    rules: { '@typescript-eslint/no-non-null-assertion': 'off' },
  },
  {
    files: ['**/*.{js,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: { ...globals.node } },
  },
);
