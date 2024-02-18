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

    // https://github.com/asbiin/semantic-release-github-pullrequest
    [
      "semantic-release-github-pullrequest",
      {
        assets: [
          "charts/values.yaml",
          "CHANGELOG.md",
          "package.json",
          "package-lock.json",
        ],
        baseRef: "develop",
      },
    ],

    // Not sure if this is needed. Let's keep it for now.
    // https://github.com/semantic-release/github
    "@semantic-release/github",
  ],
};
