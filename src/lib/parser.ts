import { existsSync, readFileSync } from 'fs';
import { extname } from 'path';
import YAML from 'yaml';
import FileNotFoundError from '../errors/file-not-found.error';

export default function parse<T = any>(path: string): T {
  if (!existsSync(path)) {
    throw new FileNotFoundError(path);
  }

  const extension = extname(path);

  let parser: (data: string) => T;

  switch (extension) {
    case '.json':
      parser = JSON.parse;
      break;
    case '.yaml':
    case '.yml':
      parser = YAML.parse;
      break;
    default:
      throw new Error(`Invalid extension: ${extension}`);
  }

  return parser(readFileSync(path, { encoding: 'utf-8' }));
}
