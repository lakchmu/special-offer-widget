module.exports = {
  "extends": ["airbnb-base", "plugin:jest/recommended"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "no-alert": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
  "plugins": ["jest"]
};