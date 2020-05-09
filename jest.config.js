process.env.ENVIRONMENT = "Test";

module.exports = {
  roots: ['<rootDir>/__TESTS__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ["TS2345", "TS2322"]
      }
    }
  },
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Online payment test suites",
      "sort" : "titleAsc",
      "outputPath" : "coverage/test-report.html"
    }]
  ]
}