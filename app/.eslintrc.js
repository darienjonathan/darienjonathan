module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier-vue/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  rules: {
    'quotes': ['error', 'single'],
    'prettier/prettier': 'error',
    'prefer-const': 'error',
    'vue/multi-word-component-names': 'off'
  },
  ignorePatterns: ['.eslintrc.js']
}
