export default {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  coverageDirectory: 'test-output/jest/coverage',
	testMatch: ['**/*.test.tsx', '**/*.test.ts'],
	setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
