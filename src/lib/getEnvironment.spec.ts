import { Environment } from '../types/environment';
import { Ref } from '../types/ref';
import { getEnvironment } from './getEnvironment';

const standards: Record<string, Environment> = {
  production: { tags: ['*.*.*'], 'tags-ignore': ['*.*.*-rc*'] },
  staging: { tags: ['*.*.*-rc*'] },
  edge: { branches: ['main'] },
};

const priority: Record<string, Environment> = {
  production: { priority: 1, branches: ['**'] },
  edge: { priority: 2, branches: ['main'] },
};

const dataset: [Record<string, Environment>, Ref, string][] = [
  [standards, { type: 'tag', name: '1.0.0' }, 'production'],
  [standards, { type: 'tag', name: '1.0.0-rc1' }, 'staging'],
  [standards, { type: 'branch', name: 'main' }, 'edge'],
  [priority, { type: 'branch', name: 'main' }, 'edge'],
];

describe('getEnvironment', () => {
  it.each(dataset)('should parse %p on ref %p to %p', (environments, ref, expectedName) => {
    expect(getEnvironment({ environments }, ref)).toStrictEqual({
      name: expectedName,
      environment: environments[expectedName],
    });
  });

  it('should throw an error when there is not environment match', () => {
    expect(() => getEnvironment({ environments: standards }, { type: 'branch', name: 'foo' })).toThrowError();
  });
});
