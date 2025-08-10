export interface SearchResponse {
  activeList: {
    data: Array<{
      type: 'video' | 'audio' | 'photo';
      count: number;
      data: SearchItem[];
    }>;
  };
}

export interface SearchItem {
  id: string | number;
  title?: string;
  description?: string;
  date?: string | number;
  imageUrl?: string;
}
