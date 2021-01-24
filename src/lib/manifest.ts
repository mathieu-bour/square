import { getInput, info } from '@actions/core';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import FileNotFoundError from '../errors/file-not-found.error';
import parse from './parser';
import workdir from './workdir';

export interface Manifest {
  version: string;
}

const WELL_KNOWN_NAMES = ['composer.json', 'package.json'];
const FIELDS = ['version'];

let cached: Manifest;

/**
 * Get the manifest.
 */
export default (dir: string = workdir()): Manifest => {
  if (cached) {
    return cached;
  }

  const ls = readdirSync(dir);
  const givenManifest = getInput('manifest');
  const search = givenManifest !== '' ? [givenManifest] : [...WELL_KNOWN_NAMES];
  const found = search.find(m => ls.includes(m));

  if (!found) {
    throw new FileNotFoundError('Unable to find a valid manifest file', search);
  }

  info(`Using manifest file: ${found}`);
  const raw = parse(resolve(dir, found));

  return (cached = Object.entries(raw).reduce((acc, [key, val]) => {
    if (!FIELDS.includes(key)) {
      return acc;
    }
    return { ...acc, [key]: val };
  }, {} as Manifest));
};
