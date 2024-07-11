module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
