import mantine from "eslint-config-mantine";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
import json from "@eslint/json";
import markdown from "@eslint/markdown";

export default tseslint.config(
  ...mantine,
  {
    ...mdx.flat,
    files: ["**/*.mdx"],
    rules: {
      // General MDX/prose rules can go here
    },
  },
  ...markdown.configs.recommended,

  json.configs.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  eslintConfigPrettier,
  {
    ignores: ["**/*.{mjs,cjs,js}", "build/", "dist/", "config/", ".idea/", "node_modules/"],
  },
);
