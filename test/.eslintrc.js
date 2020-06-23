module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
 rules: {

    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-var-requires':0,

    // Disabled checks
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,

    // Required checks
    'indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        'allowExpressions': true,
        'allowTypedFunctionExpressions': true,
        'allowHigherOrderFunctions': true
      }
    ],
  }

};
