import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  automock: true,
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!my-package)(.*)'],
};
export default config;
