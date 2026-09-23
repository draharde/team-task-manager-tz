import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: 'use @/ !',
            },
            {
              files: ['src/shared/**'],
              rules: {
                'no-restricted-imports': [
                  'error',
                  { patterns: ['@/entities/*', '@/features/*', '@/widgets/*', '@/views/*'] },
                ],
              },
            },
            {
              files: ['src/entities/**'],
              rules: {
                'no-restricted-imports': [
                  'error',
                  { patterns: ['@/features/*', '@/widgets/*', '@/views/*'] },
                ],
              },
            },
            {
              files: ['src/features/**'],
              rules: {
                'no-restricted-imports': ['error', { patterns: ['@/widgets/*', '@/views/*'] }],
              },
            },
            {
              files: ['src/widgets/**'],
              rules: { 'no-restricted-imports': ['error', { patterns: ['@/views/*'] }] },
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
