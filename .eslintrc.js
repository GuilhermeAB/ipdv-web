module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
  settings: {
    'import/resolver': {
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        webpack: {
            config: require.resolve('@vue/cli-service/webpack.config.js'),
        },
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'always'],
    'object-shorthand': ['error', 'never'],
    'func-names': ['error', 'never'],
    'import/extensions': 0,
    indent: ['error', 2],
    semi: [2, 'always'],
    'max-len': 0,
    '@typescript-eslint/prefer-readonly-parameter-types': 0,
  },
  overrides: [
    // VUE
    {
      files: ['*.vue', '**/*.vue', '**/*.js', '*.js'],
      extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
      ],
      rules: {
        indent: 0,
        'object-shorthand': ['error', 'never'],
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
        'vue/html-indent': ['error', 2, { baseIndent: 1 }],
        'vue/html-quotes': ['error', 'single'],
        'vue/singleline-html-element-content-newline': 2,
        'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: { max: 1 } }],
        'vue/html-closing-bracket-newline': 2,
        'vue/attributes-order': ['error', { order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'] }],
        'vue/prop-name-casing': 0,
        'vue/require-prop-types': 'error',
        'vue/require-default-prop': 'error',
        'vue/no-multi-spaces': 'error',
        'vue/attribute-hyphenation': 'error',
        'vue/no-template-shadow': 'error',
        'vue/name-property-casing': 'error',
        'vue/mustache-interpolation-spacing': ['error', 'never'],
        'vue/html-end-tags': 'error',
        'vue/html-closing-bracket-spacing': 'error',
        'vue/this-in-template': 'error',
        'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      },
    },
    // Typescript
    {
      files: ['**/*.ts', '**/*.tsx', '*.ts', '*.tsx'],
      extends: [
        'airbnb-base',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/all',
      ],
      plugins: [
        'import',
      ],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
        },
      },
      parserOptions: {
          parser: '@typescript-eslint/parser',
          ecmaVersion: 2020,
          project: './tsconfig.json',
          sourceType: 'module',
      },
      rules: {
        'max-len': 0,
        'import/extensions': 0,
        'object-shorthand': ['error', 'never'],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/object-curly-spacing': [0, 'always'],
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: { delimiter: 'comma', requireLast: true },
          singleline: { delimiter: 'comma', requireLast: true },
        }],
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/comma-dangle': [0, 'always'],
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: [
              'state',
            ],
          },
        ],
        '@typescript-eslint/prefer-readonly-parameter-types': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
      },
    },
    // Jest
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
