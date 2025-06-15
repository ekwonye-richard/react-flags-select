const { FlatCompat } = require("@eslint/eslintrc");
const typescriptParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const prettierPlugin = require("eslint-plugin-prettier");
const storybookPlugin = require("eslint-plugin-storybook");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const extendedConfigs = compat
  .extends(
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended"
  )
  .flat();

module.exports = [
  {
    ignores: ["**/components/Flags/Countries/*.tsx", "**/*.stories.tsx"],
  },
  ...extendedConfigs,
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      storybook: storybookPlugin,
    },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-as-const": "error",
    },
  },
];
