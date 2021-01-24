import * as core from '@actions/core';

async function main(): Promise<void> {
  // Write your action here
  core.info('Hello world');
}

main().catch(e => {
  core.setFailed(e);
});
