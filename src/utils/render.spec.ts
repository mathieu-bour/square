import { render } from './render';

const cases: [string, string, Record<string, any>][] = [
  ['{{ version }}-foobar', '1.0.0-foobar', { version: '1.0.0' }],
  ['{{ foo }}{{ bar }}', 'abcdef', { foo: 'abc', bar: 'def' }],
];

describe('parser', () => {
  it.each(cases)('%p renders %p with %p', (template, result, variables) => {
    expect(render(template, variables)).toBe(result);
  });
});
