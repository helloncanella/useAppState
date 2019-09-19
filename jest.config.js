module.exports = {
  testResultsProcessor: "./node_modules/jest-bamboo-formatter",
  watchPathIgnorePatterns: ["<rootDir>/jest.json"],
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"]
}
