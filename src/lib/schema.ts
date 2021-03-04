import { array, lazy, number, object, string } from 'yup';
import { Config } from '../types/config';

export const schema = lazy((config: Config) =>
  object().shape({
    'short-sha-length': number().min(3).max(40),
    image: string(),
    environments: object(
      Object.entries(config?.environments ?? {}).reduce((spec, [key, environment]) => {
        spec[key] = object({
          priority: number().integer().positive(),
          branches: array().of(string()),
          'branches-ignore': array().of(string()),
          tags: array().of(string()),
          'tags-ignore': array().of(string()),
          pull_requests: array().of(string()),
          'pull_requests-ignore': array().of(string()),
          templates: object(
            Object.keys(environment?.templates ?? {}).reduce((spec, name) => {
              spec[name] = string();
              return spec;
            }, {} as Record<string, any>),
          ),
        });

        return spec;
      }, {} as Record<string, any>),
    ).default({}),
    templates: object(
      Object.keys(config?.templates ?? {}).reduce((spec, name) => {
        spec[name] = string();
        return spec;
      }, {} as Record<string, any>),
    ),
  }),
);
