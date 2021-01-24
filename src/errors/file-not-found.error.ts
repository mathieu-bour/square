export default class FileNotFoundError extends Error {
  constructor(path: string, tried: string[] = []) {
    super(`File ${path} does not exist.${tried.length > 0 ? ` Tried ${tried.map(t => '- ' + t).join('\n')}` : ''}`);
  }
}
