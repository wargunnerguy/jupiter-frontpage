export type MediaType = 'all' | 'photo' | 'video' | 'audio';
export type SortOption = 'accuracy' | 'old' | 'new' | 'abc';
export type TimeRange = 'all' | 'week' | 'month' | 'year' | 'custom';

export interface QueryParams {
  phrase: string;
  type: MediaType;
  sortOption: SortOption;
  page: number;
  limit: number;
  timeRange: TimeRange;
  timeRangeFrom: number | null;
  timeRangeTo: number | null;
  includeTranscription: boolean;
  advancedParams: any[];
}
