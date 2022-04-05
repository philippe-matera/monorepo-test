module.exports = {
  testMatch: ["<rootDir>/**/*.spec.js"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10,
    },
  },
}
