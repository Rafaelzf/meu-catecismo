"use client";
import { createContext, useState } from "react";
import { Questions } from "./types";

export const QuestionsContext = createContext<Questions>({
  questions: [],
  question: undefined,
  setQuestions: () => {},
  setQuestion: () => {},
});

export const QuestionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [questions, setQuestions] = useState<Questions["questions"]>();
  const [question, setQuestion] = useState<Questions["question"]>();

  return (
    <QuestionsContext.Provider
      value={{ questions, setQuestions, question, setQuestion }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
