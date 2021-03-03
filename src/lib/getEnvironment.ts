import { any } from 'micromatch';
import { Config } from '../types/config';
import { Environment } from '../types/environment';
import { Ref } from '../types/ref';

/**
 * Get the environment based on the config and the parsed reference.
 * @param {Config} config The square configuration.
 * @param {Ref} ref The parsed git reference ({@see Ref}).
 * @returns {{ name: string, environment: Environment }}
 */
export function getEnvironment(config: Config, ref: Ref): { name: string; environment: Environment } {
  if (!config.environments || Object.keys(config.environments).length === 0) {
    // No environments were configured
    throw new Error('No configured environments');
  }

  const sortedEnvironments = Object.entries(config.environments ?? {}).sort((a, b) => {
    if (typeof a[1].priority === 'number' && typeof b[1].priority === 'number') {
      return b[1].priority - a[1].priority;
    } else if (typeof b[1].priority === 'number') {
      return 1;
    } else if (typeof a[1].priority === 'number') {
      return -1;
    } else {
      return 0;
    }
  });

  const found = sortedEnvironments.find(([, environment]) => {
    const match = (ref.type === 'branch' ? environment.branches : environment.tags) ?? [];
    const ignore = (ref.type === 'branch' ? environment['branches-ignore'] : environment['tags-ignore']) ?? [];

    return any(ref.name, match) && !any(ref.name, ignore);
  });

  if (!found) {
    throw new Error('Unable to find a matching environment');
  }

  return {
    name: found[0],
    environment: found[1],
  };
}
