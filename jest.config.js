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
  }
}