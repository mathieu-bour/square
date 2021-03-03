import { Config } from '../types/config';
import { schema } from './schema';

const valid: [Config, boolean][] = [
  [
    {
      image: 'test',
      environments: {
        production: {
          branches: ['main'],
        },
      },
    },
    true,
  ],
];

describe('schema', () => {
  it.each(valid)('should pass schema validation', (config, valid) => {
    expect(schema.isValidSync(config)).toBeTruthy();
  });
});
