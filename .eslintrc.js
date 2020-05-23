module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'eslint-config-airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'default-case': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 2,
  },
};
