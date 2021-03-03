import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { getConfig } from './lib/getConfig';
import { getEnvironment } from './lib/getEnvironment';
import { getRef } from './lib/getRef';
import { getVersion } from './lib/getVersion';
import { output } from './utils/output';
import { render } from './utils/render';

async function main(): Promise<void> {
  // Gather the data
  const ref = getRef();
  const config = getConfig();
  const { name, environment } = getEnvironment(config, ref);
  const version = getVersion();

  // Set the action variables
  const variables = {
    sha: context.sha,
    build: context.runNumber,
    'short-sha': context.sha.substr(0, config['short-sha-length'] ?? 8),
    version,
    'ref-type': ref.type,
    'ref-name': ref.name,
    image: environment.image ?? config.image,
    environment: name,
  };

  // Build the templates
  const templates = {
    semver: '{{ version }}+{{ build }}.{{ short-sha }}',
    'image-tag': '{{ image }}:{{ version}}.{{ build }}.{{ short-sha }}',
    'image-tag-latest': '{{ image }}:latest.{{ environment }}',
    ...config.templates,
    ...environment.templates,
  };

  // Build the exports
  const exports: Record<string, any> = {
    ...variables,
    ...Object.entries(templates).reduce((rendered, [name, input]) => {
      rendered[name] = render(input, variables);
      return rendered;
    }, {} as Record<string, string>),
  };

  Object.entries(exports).forEach(([name, value]) => output(name, value));
}

main().catch(e => {
  setFailed(e);
});
