import { exportVariable, getInput, setOutput } from '@actions/core';
import { constantCase } from 'constant-case';

export function output(name: string, value: any, mode = getInput('mode')) {
  if (mode === 'both' || mode.startsWith('env')) {
    exportVariable(constantCase(name), value);
  } else if (mode === 'both' || mode === '') {
    setOutput(name, value);
  }
}
