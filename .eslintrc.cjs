module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",

  noInlineConfig: true,

  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },

  plugins: ["@typescript-eslint", "unicorn", "prettier"],

  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
  ],

  settings: {
    "import/resolver": { typescript: {} },
  },

  ignorePatterns: ["vite.config.ts", "commitlint.config.js", "dist/**"],
  
  rules: {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "no-console": "error",
    "unicorn/prevent-abbreviations": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
  },
};
