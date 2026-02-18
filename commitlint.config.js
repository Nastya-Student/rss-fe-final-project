export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "ci",
        "build",
        "perf",
        "revert",
        "init",
      ],
    ],
    "subject-case": [0],
    "header-format": [2, "always"],
  },

  plugins: [
    {
      rules: {
        "header-format": ({ header }) => {
          const regex =
            /^(feat|fix|docs|style|refactor|test|chore|ci|build|perf|revert|init): RST-\d+ .+/;
          const valid = regex.test(header);
          return [
            valid,
            "Commit must be in format: <type>: RST-<number> <description>",
          ];
        },
      },
    },
  ],
};
