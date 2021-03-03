import { Context } from '@actions/github/lib/context';
import { Ref } from '../types/ref';
import { getRef } from './getRef';

const datasets: [string, Ref][] = [
  ['refs/heads/main', { type: 'branch', name: 'main' }],
  ['refs/heads/CS-231-foobar', { type: 'branch', name: 'CS-231-foobar' }],
  ['refs/heads/feat/foo/bar', { type: 'branch', name: 'feat/foo/bar' }],
  ['refs/tags/1.0.0', { type: 'tag', name: '1.0.0' }],
  ['refs/tags/v1.2.3', { type: 'tag', name: 'v1.2.3' }],
];

let contextMock: Partial<Context> = {};
jest.mock('@actions/github', () => ({
  get context() {
    return contextMock;
  },
}));

describe('getRef', () => {
  it.each(datasets)('should parse %p to %p', (ref, parsed) => {
    contextMock.ref = ref;
    expect(getRef()).toStrictEqual(parsed);
  });

  it('should throw error on non-recognized refs', () => {
    contextMock.ref = 'refs/foo/bar';
    expect(() => getRef()).toThrowError();
  });
});
