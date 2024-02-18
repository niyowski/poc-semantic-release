/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["develop"],
  plugins: [
    // https://github.com/semantic-release/commit-analyzer
    "@semantic-release/commit-analyzer",

    // https://github.com/semantic-release/release-notes-generator
    "@semantic-release/release-notes-generator",

    // https://github.com/semantic-release/changelog
    "@semantic-release/changelog",

    // https://github.com/semantic-release/npm
    "@semantic-release/npm",

    // https://github.com/semantic-release/exec
    [
      "@semantic-release/exec",
      {
        prepareCmd: "./update-charts.sh ${nextRelease.version}",
      },
    ],

    // https://github.com/semantic-release/git
    [
      "@semantic-release/git",
      {
        assets: [
          "charts/values.yaml",
          "CHANGELOG.md",
          "package.json",
          "package-lock.json",
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],

    // https://github.com/semantic-release/github
    "@semantic-release/github",
  ],
};
