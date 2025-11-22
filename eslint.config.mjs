import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,mjs,cjs,ts}"],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120, singleQuote: false }],
      eqeqeq: "error",
      "@typescript-eslint/no-unused-vars": ["error", { // ✅ отключили проверку
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }], 
      "@typescript-eslint/no-explicit-any": "off", // ✅ отключаем ошибку "Unexpected any"
    },
  },
  {
    ignores: ["node_modules", "**/dist/**", "eslint.config.mts", "playwright-report"],
  },
];
