export interface QueryParams {
  offset?: number;
  limit?: number;
  sort?: string[][] | { [key: string]: 1 | -1 };
  where?: any;
  filters?: any;
  select?: string[];
  populate?: string[];
  data?: {
    [key: string]: any
  };
}
