import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  files: ["**/*.js"],
  rules: {
    "sourceType": "commonjs",
  },
  globals: {
    ...globals,
    jest: "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:js/recommended",
    "plugin:jest/recommended",
  ],
  plugins: [
    pluginJs,
    "jest",
  ],
};