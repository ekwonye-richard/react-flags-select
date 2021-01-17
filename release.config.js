import pkg from "./package.json";

module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/npm",
      {
        assets: [...pkg.files, "package.json", "yarn.lock", "CHANGELOG.md"],
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "yarn.lock", "CHANGELOG.md"],
      },
    ],
  ],
};
