import { Filter } from './filter';
import { ReleaseInfo } from './release-info';
import { Templates } from './templates';

export type Environment = Filter &
  Partial<ReleaseInfo> & {
    priority?: number;
    templates?: Templates;
  };
