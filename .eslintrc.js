/*
  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *  http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

const singleLineString = `^\\s*[^\\s]*'([^']|(\\\\'))*',?;?$`
const doubleQuoted = singleLineString.replace(/'/g, '"')
const template = singleLineString.replace(/'/g, '`')

const maxLengthIgnorePattern = `(${singleLineString})|(${doubleQuoted})|(${template})`

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    curly: ["error", "multi"],
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],

    'prettier/prettier': 'off',
    'max-len': ['error', { code: 100, ignorePattern: maxLengthIgnorePattern }],
    'arrow-body-style': ["error", "as-needed"],
    'eol-last': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'space-in-parens': ['error', 'never'],
    'keyword-spacing': ["error", { before: true, after: true }],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/order': ['warn', {
      groups: ['builtin', 'external','internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'ignore'
    }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'comma', requireLast: true },
      singleline: { delimiter: 'comma', requireLast: false }
    }],
    '@typescript-eslint/no-unused-vars': 'off',
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
}
