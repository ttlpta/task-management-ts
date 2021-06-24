module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'eslint-config-prettier',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
    // ecmaFeatures: {
    //   spread: true,
    //   jsx: true,
    // },
    // ecmaVersion: 12,
    // sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "import/no-cycle": 0,
    "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/react-in-jsx-scope": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "import/prefer-default-export": 0,
  },
};
