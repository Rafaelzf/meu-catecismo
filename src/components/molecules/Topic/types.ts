export type Topic = {
  id: number;
  title: string;
  page: string;
  active: boolean;
  image?: null;
  parentTopicId: number;
  createDate?: string;
  updateDate?: string;
};
