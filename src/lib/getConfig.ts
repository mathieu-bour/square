import { info } from '@actions/core';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import FileNotFoundError from '../errors/file-not-found.error';
import { Config } from '../types/config';
import { parse } from '../utils/parser';
import { workdir } from '../utils/workdir';
import { schema } from './schema';

const names = ['square', 'squarerc', '.square', '.squarerc'];
const extensions = ['yaml', 'yml', 'json'];
const search = names.reduce<string[]>((acc, file) => {
  return [...acc, ...extensions.map(extension => `${file}.${extension}`)];
}, [] as string[]);
search.push('package.json');

function isPackageJson(config: object): config is { square: Config } {
  return config.hasOwnProperty('square');
}

export function getConfig(dir: string = workdir()): Config {
  const ls = readdirSync(dir);
  const found = search.find(file => ls.includes(file));

  if (!found) {
    throw new FileNotFoundError(`Unable to find a valid configuration file in ${dir}.`, search);
  }

  info(`Using configuration file: ${found} in ${dir}`);
  const raw = parse<Config | { square: Config }>(resolve(dir, found));

  let config: Config;

  if (found === 'package.json') {
    if (isPackageJson(raw)) {
      config = raw.square;
    } else {
      throw new FileNotFoundError('There is no "square" entry in package.json nor any square config file.', search);
    }
  } else {
    config = raw as Config;
  }

  return (schema.validateSync(config) as unknown) as Config;
}
