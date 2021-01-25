module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  coverageReporters: ['clover'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec/ts'],
};
