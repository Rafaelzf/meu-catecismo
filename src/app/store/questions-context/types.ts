import { QuestionsAsks } from "@/components/molecules/Topic/types";
import { Dispatch, SetStateAction } from "react";

export type Questions = {
  questions?: QuestionsAsks[];
  setQuestions: Dispatch<SetStateAction<QuestionsAsks[] | undefined>>;
  question?: QuestionsAsks;
  setQuestion: Dispatch<SetStateAction<QuestionsAsks | undefined>>;
};
