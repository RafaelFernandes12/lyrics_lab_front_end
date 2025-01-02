import type { Config } from 'jest'
import nextJest from 'next/jest.js'
import fs from 'fs';
import path from 'path';

const createJestConfig = nextJest({
  dir: './',
})

const coveragePath = path.join(__dirname, 'public', 'coverage');

if (fs.existsSync(coveragePath)) {
  fs.rmSync(coveragePath, { recursive: true, force: true });
}
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', 'src/**/*.ts'],
  coverageDirectory: 'public/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
}

export default createJestConfig(config)
