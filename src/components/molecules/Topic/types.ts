export type Topic = {
  id?: number;
  parentSlug: string;
  title: string;
  parentSectionId: number;
  image?: string;
  questionsAsks?: QuestionsAsks[];
  active?: boolean;
  createDate?: string;
  updateDate?: string;
};

export type QuestionsAsks = {
  id?: number;
  question: string;
  asks: Ask[];
  topicId: number;
  createDate?: string;
  updateDate?: string;
};

export type Ask = {
  id?: number;
  ask: string;
  questionId?: number;
  createDate?: string;
  updateDate?: string;
};
