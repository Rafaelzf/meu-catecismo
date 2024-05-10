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

export type PropsContentTopics = {
  data: ContentTopics[];
};
