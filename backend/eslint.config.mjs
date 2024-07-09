import globals from "globals";
import pluginJs from "@eslint/js";


// export default [
//   {
//     files: ["**/*.js"], 
//     languageOptions: {
//       sourceType: "commonjs"
//     }
//   },
//   {
//     globals: {
//       jest: "readonly",  
//     },
//   },
  
//   {
//     languageOptions: { 
//       globals: globals.browser 
//     }
//   },
//   pluginJs.configs.recommended,
// ];

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