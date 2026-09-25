import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import checkFile from 'eslint-plugin-check-file';

const eslintConfig =  defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'public/mockServiceWorker.js']),

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
          enforceConst: true,
        },
      ],
    },
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { 'src/**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/app/**/': 'NEXT_JS_APP_ROUTER_CASE', 'src/!(app)/**/': 'KEBAB_CASE' },
      ],
    },
  },

  prettier,
]);

export default eslintConfig;
