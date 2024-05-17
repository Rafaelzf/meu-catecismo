export type Topic = {
  id?: number;
  parentSlug: string;
  title: string;
  parentSectionId: number;
  image?: null;
  content?: QuestionsAsks[];
  active?: boolean;
  createDate?: string;
  updateDate?: string;
};

export type QuestionsAsks = {
  id?: number;
  question: string;
  ask: Ask[];
  topicId: number;
  createDate?: string;
  updateDate?: string;
};

export type Ask = {
  id?: number;
  ask: string;
  createDate?: string;
  updateDate?: string;
};
