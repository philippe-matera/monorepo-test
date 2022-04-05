module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  // prettier-ignore
  extends: [
    "prettier"
  ],

  globals: {
    I18n: "readonly",
    $: "readonly",
    hj: "readonly",
  },

  parser: "babel-eslint",

  ignorePatterns: ["*.json", "**/query/*.ts"],

  rules: {
    // specific to packages :
    "import/prefer-default-export": "off",
    "no-undefined": "off",
  },

  settings: {
    "import/resolver": {
      "babel-module": {},
    },
    react: {
      // Default to latest and warns if missing
      // It will default to "detect" in the future
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["airbnb", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended"],
      rules: {
        "import/order": ["error", {"newlines-between": "always"}],
        "arrow-parens": ["error", "as-needed"],
        camelcase: 0,
        "func-names": 0,
        "function-paren-newline": 0,
        // "func-names": ["error", "as-needed"],
        "import/no-named-as-default": 0,
        "implicit-arrow-linebreak": 0,
        indent: 0,
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/media-has-caption": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "lines-between-class-members": ["error", "always", {exceptAfterSingleLine: true}],
        "no-confusing-arrow": 0,
        "no-else-return": 0,
        "no-plusplus": ["error", {allowForLoopAfterthoughts: true}],
        "no-return-assign": ["error", "except-parens"],
        "object-curly-newline": ["error", {multiline: true, consistent: true}],
        "object-curly-spacing": ["error", "never"],
        "one-var": 0,
        "one-var-declaration-per-line": ["error", "initializations"],
        "operator-linebreak": 0,
        quotes: ["error", "double"],
        radix: 0,
        "react/destructuring-assignment": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-wrap-multilines": [
          "error",
          {
            declaration: "parens-new-line",
            assignment: "parens-new-line",
            return: "parens-new-line",
            arrow: "parens-new-line",
            condition: "ignore",
            logical: "ignore",
            prop: "ignore",
          },
        ],
        "react/no-array-index-key": 0,
        "react/no-danger": 0,
        "react/no-unescaped-entities": 0,
        "react/no-unused-prop-types": 0,
        semi: 0,
        "space-before-function-paren": ["error", {anonymous: "never", named: "never", asyncArrow: "always"}],
        "no-console": "error",
        "no-underscore-dangle": ["error", {allow: ["_destroy"]}],
        "react/jsx-fragments": 0,
        "react/jsx-props-no-spreading": 0,
        // All under rules are to be deleted
        "jsx-a11y/label-has-for": 0,
        "max-len": 0,
        "no-class-assign": 0,
        "no-mixed-operators": 0,
        "no-param-reassign": 0,
        "no-shadow": 0,
        "prefer-destructuring": 0,
        "react/no-find-dom-node": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-closing-tag-location": 0,
        "react/no-access-state-in-setstate": 0,
        "react/no-multi-comp": 0,
        "react/no-this-in-sfc": 0,
        "react/require-default-props": 0,
        "react/sort-comp": 0,
        "react/style-prop-object": 0,
        "max-classes-per-file": 0,
        "@typescript-eslint/camelcase": 0,
        "import/no-unresolved": 0,
        "import/prefer-default-export": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "import/extensions": ["error", {js: "never", ts: "never"}],
        "react/jsx-filename-extension": [1, {extensions: [".jsx", ".tsx"]}],
      },
    },
  ],
}
