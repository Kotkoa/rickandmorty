import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['dist/', 'src/generated/'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: { 'simple-import-sort': simpleImportSort, react: fixupPluginRules(react) },
    settings: { react: { version: 'detect' } },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'react/no-multi-comp': ['warn', { ignoreStateless: false }],
      'react/no-array-index-key': 'warn',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],

      'no-nested-ternary': 'warn',
      'no-param-reassign': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-return-assign': ['error'],
      'no-loop-func': ['error'],
      'no-self-compare': ['error'],
      'no-unmodified-loop-condition': ['error'],
      'no-useless-concat': ['error'],

      curly: ['error', 'all'],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': ['error'],
      'no-useless-computed-key': ['error'],
      'no-useless-rename': ['error'],
      'no-var': ['error'],
      'object-shorthand': ['error', 'always'],
      'prefer-arrow-callback': ['warn'],
      'prefer-const': ['error'],
      'prefer-rest-params': ['error'],
      'prefer-spread': ['error'],
      'rest-spread-spacing': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-unneeded-ternary': ['error'],

      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[object.name='React']",
          message: 'Import from react instead of using React.* (e.g., useEffect, useState).',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message:
                "Remove `import React from 'react'`. With the new JSX runtime, you don't need the default import.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  eslintConfigPrettier,
]);
