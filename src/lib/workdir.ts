import { getInput } from '@actions/core';

export default () => {
  const input = getInput('working-directory');
  return input !== '' ? input : process.cwd();
};
