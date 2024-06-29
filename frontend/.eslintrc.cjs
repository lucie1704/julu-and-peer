module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: "@typescript-eslint/parser",
      ecmaVersion: 2020,
      sourceType: "module",
      extraFileExtensions: [".vue"],
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/vue3-recommended',
      '@vue/eslint-config-typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    plugins: ['import', 'simple-import-sort'],
    rules: {
      'vue/no-unused-vars': 'error',
      'brace-style': ['error', 'stroustrup'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'indent': 'off',
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-undef': 'off',
      'object-curly-spacing': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'semi': ['warn', 'always'],
      'space-before-blocks': ['warn', 'always'],
      'space-infix-ops': ['error', { 'int32Hint': false }],
      'import/first': 'error',
      'vue/multi-word-component-names': 'off',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': ['warn', {
        groups: [
          ["^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)"],
          ['^\\u0000', '^@?\\w', '^', '^\\.']
        ]
      }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-lonely-if': 'error',
      'quotes': ['warn', 'single'],
    },
  }