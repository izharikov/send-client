import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  testRegex: '.*.test.ts$',
  verbose: true,
  setupFiles: ['./src/setupTests.ts'],
};

export default config;