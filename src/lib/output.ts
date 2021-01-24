import { exportVariable, getInput, setOutput } from '@actions/core';
import { constantCase } from 'constant-case';

const mode: 'env' | 'output' = getInput('mode').startsWith('env') ? 'env' : 'output';

export default (name: string, value: any) => {
  if (mode === 'env') {
    exportVariable(constantCase(name), value);
  } else {
    setOutput(name, value);
  }
};
