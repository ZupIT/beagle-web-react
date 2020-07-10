const singleLineString = `^\\s*[^\\s]*'([^']|(\\\\'))*',?;?$`
const doubleQuoted = singleLineString.replace(/'/g, '"')
const template = singleLineString.replace(/'/g, '`')

const maxLengthIgnorePattern = `(${singleLineString})|(${doubleQuoted})|(${template})`

module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': 'off',
    curly: ["error", "multi"],
    'max-len': ['error', { code: 150, ignorePattern: maxLengthIgnorePattern }],
    'arrow-body-style': ["error", "as-needed"],
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'semi': ['error', 'never'],
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
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'comma', requireLast: true },
      singleline: { delimiter: 'comma', requireLast: false }
    }],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
