export interface Filter {
  branches?: string[];
  'branches-ignore'?: string[];
  tags?: string[];
  'tags-ignore'?: string[];
  pull_requests?: string[];
  'pull_requests-ignore'?: string[];
}
