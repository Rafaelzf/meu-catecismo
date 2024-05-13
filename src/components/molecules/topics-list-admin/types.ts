export type ContentTopics = {
  id: number;
  title: string;
  parentTopicId: number;
  active: boolean;
  page: string;
  image?: null;
  createDate?: string;
  updateDate?: string;
};

export type PropsDataTopics = {
  data: PropsContentTopics;
};

export type PropsContentTopics = {
  id?: number;
  parentSlug?: string;
  parentSectionId?: number;
  content: ContentTopics[];
  createDate?: string;
  updateDate?: string;
};
