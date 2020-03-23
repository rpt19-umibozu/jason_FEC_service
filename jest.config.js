const {defaults} = require('jest-config');

module.exports = {
  // transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
  verbose: true,
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  testEnvironment: "jsdom",
  moduleDirectories: [
    "src",
    "node_modules"
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform"
  },
  setupFilesAfterEnv: ["<rootDir>/spec/client/app.test.jsx"],
  setupFiles: [
    "<rootDir>setup.js"
  ],
  moduleFileExtensions: [
    "css",
    "scss",
    "js",
    "json",
    "jsx"
  ],
  testRegex: "\/spec\/.*\\.js$",
  transformIgnorePatterns: [
    "/node_modules/(?!test-component).+\\.js$"
  ]
}