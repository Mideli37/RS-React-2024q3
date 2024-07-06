module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json',
  },
  plugins: ['react-refresh', 'react-compiler'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'off' } },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/lines-between-class-members': 'warn',
    'import/prefer-default-export': 'off',
    'curly': ['error', 'all'],
    'no-console': 'warn',
    'no-underscore-dangle': 'off',
    'no-void': 'off',
    'react-compiler/react-compiler': 'error',
    'react/prefer-stateless-function': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': { typescript: true },
  },
  noInlineConfig: true,
  reportUnusedDisableDirectives: true,
};
