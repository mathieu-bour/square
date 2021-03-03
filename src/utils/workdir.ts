import { getInput } from '@actions/core';

/**
 * Get the current working directory based on the 'working-directory' input.
 * If the input is not set, simply return `process.cwd`.
 */
export function workdir(): string {
  const input = getInput('working-directory');
  return input !== '' ? input : process.cwd();
}
