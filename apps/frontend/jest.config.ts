export default {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  coverageDirectory: 'test-output/jest/coverage',
	testMatch: ['**/*.test.tsx', '**/*.test.ts'], // Asegura que Jest busque archivos .test.tsx
	setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
