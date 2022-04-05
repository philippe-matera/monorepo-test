import {codeCoverage} from "danger-plugin-code-coverage"

const defaultPluginOptions = [
  {
    title: "# Coverage",
    ignoreCoveragePattern: [
      "yarn.lock",
      "package.json",
      "index.js",
      ".drone.yml",
      ".gitignore",
      "utils/.eslintrc.js",
      "utils/jest.config.js",
      "utils/dangerfile.js",
      "spec.js",
    ],
    coverageFilesPath: "coverage/coverage-final.json",
  },
]

// lock file
const packageChanged = danger.git.modified_files.includes("package.json")
const lockfileChanged = danger.git.modified_files.includes("yarn.lock")
if (packageChanged && !lockfileChanged) {
  const message = "Changes were made to package.json, but not to yarn.lock"
  const idea = "Perhaps you need to run `yarn install`?"
  warn(`${message} - <i>${idea}</i>`)
}

// Big PR warning
var bigPRThreshold = 1000
if (danger?.github?.pr?.additions + danger?.github?.pr?.deletions > bigPRThreshold) {
  warn(":exclamation: Big PR")
  markdown(
    "> Pull Request size seems relatively large (more than 600 deletions + additions). If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.",
  )
}

// Always ensure we assign someone, so that the reviewer can be notified
if (danger?.github?.pr?.reviewer === null) {
  warn("Please assign someone to review this PR :)")
}

codeCoverage(defaultPluginOptions)
