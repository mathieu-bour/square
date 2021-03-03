import { Environment } from './environment';
import { ReleaseInfo } from './release-info';
import { Templates } from './templates';

export type Config = ReleaseInfo & {
  environments?: Record<string, Environment>;
  templates?: Templates;
};
