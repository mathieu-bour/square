export interface Ref {
  name: string;
  type: 'branch' | 'tag' | 'pull_request';
}
