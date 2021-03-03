import { context } from '@actions/github';

export function getRef(): { type: 'branch' | 'tag'; name: string } {
  if (context.ref.match(/^refs\/heads\/.*$/)) {
    // this is a branch
    return {
      type: 'branch',
      name: context.ref.replace('refs/heads/', ''),
    };
  } else if (context.ref.match(/^refs\/tags\/.*$/)) {
    // this is a tag
    return {
      type: 'tag',
      name: context.ref.replace('refs/tags/', ''),
    };
  }

  throw new Error(`Invalid ref (not a branch nor a tag), got ${context.ref}`);
}
