module.exports = {
  verbose: false,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/unit-test/setup.js', 'jest-localstorage-mock'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^.+\\.(css|scss|svg|png)$': '<rootDir>/unit-test/jest-stub.js',
    '^containers(.*)$': '<rootDir>/src/containers$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^core(.*)$': '<rootDir>/src/core$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^routes(.*)$': '<rootDir>/src/routes$1',
  },
  modulePaths: ['src'],
  setupFilesAfterEnv: ['<rootDir>/unit-test/setup-test.js'],
}
