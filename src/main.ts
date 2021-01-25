import * as core from '@actions/core';
import { getInput } from '@actions/core';
import { context } from '@actions/github';
import getConfig from './lib/config';
import getManifest from './lib/manifest';
import output from './lib/output';
import render from './lib/render';

async function main(): Promise<void> {
  const exports: Record<string, any> = {};
  const manifest = getManifest();
  const config = getConfig();

  // Version
  exports.version = manifest.version;

  // Environment
  const ref = context.ref.replace(/^refs\/(?:heads|tags)\//, '');
  const found = Object.entries(config.environments).find(([, exp]: [string, string]) => ref.match(new RegExp(exp)));
  exports.environment = found ? found[0] : null;

  // Image
  exports.image = config.docker?.image ?? '';

  // Build
  exports.build = context.runNumber;

  // Short-sha
  exports['short-sha'] = context.sha.substr(0, parseInt(config.git['short-sha-length'] ?? '7', 10));

  // Render templates
  exports.release = render(getInput('release'), exports);
  exports['image-release'] = render(getInput('image-release'), exports);
  exports['image-latest'] = render(getInput('image-latest'), exports);

  // Exports as outputs
  Object.entries(exports).forEach(([key, val]) => output(key, val));
}

main().catch(e => {
  core.setFailed(e);
});
