import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier/recommended";
import prettierConfig from "./.prettierrc.json" with { type: "json" };

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      typescript: tsPlugin
    },
    rules: {
      "prettier/prettier": ["error", prettierConfig],
      "unicorn/filename-case": "off",
      "google-font-display": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
    }
  }
];