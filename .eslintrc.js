module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
  },

  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-regex-spaces': 0,
    'no-unexpected-multiline': 0,
  },
}