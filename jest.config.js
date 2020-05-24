module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  modulePaths: ['<rootDir>'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css': '<rootDir>/__mocks__/cssMock.js',
    '\\.scss': '<rootDir>/__mocks__/cssMock.js',
  },
};
