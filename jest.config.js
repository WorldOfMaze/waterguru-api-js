/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // use ts-jest for TypeScript files
  testEnvironment: "node", // Node.js environment
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"], // match .test.ts, .spec.ts etc.
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // specify your tsconfig if not default
    },
  },
  collectCoverage: true, // optional, collect test coverage
  coverageDirectory: "coverage", // where to save coverage info
};
