import { getInput, info } from '@actions/core';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import FileNotFoundError from '../errors/file-not-found.error';
import { parse } from '../utils/parser';
import { workdir } from '../utils/workdir';

const WELL_KNOWN = ['composer.json', 'package.json'];

/**
 * Get the application version from a manifest.
 */
export function getVersion(dir: string = workdir()): string {
  const ls = readdirSync(dir);
  const givenManifest = getInput('manifest');
  const search = givenManifest !== '' ? [givenManifest] : [...WELL_KNOWN];
  const found = search.find(m => ls.includes(m));

  if (!found) {
    throw new FileNotFoundError('Unable to find a valid manifest file', search);
  }

  info(`Using manifest file: ${found} in ${dir}`);
  const path = resolve(dir, found);
  const raw: { version?: string } = parse(path);

  if (!raw.version) {
    throw new Error(`Unable to read version from ${path}`);
  }

  return raw.version;
}
