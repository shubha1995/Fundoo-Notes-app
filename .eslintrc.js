module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true
  },
  extends: [
    "standard"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    semi: [
      "error",
      "always"
    ],
    quotes: [
      "error",
      "double"
    ],
    indent: ["error", 2]
  }
};
