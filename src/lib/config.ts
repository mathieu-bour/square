import { info } from '@actions/core';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { lazy, number, object, string } from 'yup';
import FileNotFoundError from '../errors/file-not-found.error';
import parse from './parser';
import workdir from './workdir';

const schema = lazy(config =>
  object().shape({
    git: object().shape({
      'short-sha-length': number().min(3).max(40),
    }),
    environments: object(
      Object.entries(config?.environments ?? {}).reduce((spec, [key]) => {
        return { ...spec, [key]: string().required() };
      }, {}),
    ).default({}),
    docker: object().shape({
      image: string().required(),
    }),
  }),
);

interface Config {
  git: {
    'short-sha-length': string;
  };
  environments: Record<string, string>;
  docker?: {
    image: string;
  };
}

const names = ['square', 'squarerc', '.square', '.squarerc'];
const extensions = ['yaml', 'yml', 'json'];
const search = names.reduce<string[]>((acc, file) => {
  return [...acc, ...extensions.map(extension => `${file}.${extension}`)];
}, [] as string[]);
search.push('package.json');

let cached: Config;

function isPackageJson(config: any): config is { square: Config } {
  return config.hasOwnProperty('square');
}

export default (dir: string = workdir()): Config => {
  if (cached) {
    return cached;
  }

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

  return (cached = (schema.validateSync(config) as unknown) as Config);
};
