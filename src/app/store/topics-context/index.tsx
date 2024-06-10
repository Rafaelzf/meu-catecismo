"use client";
import { createContext, useState } from "react";
import { TopicsTypes, TopicscontextProviderProps } from "./types";
import { InfoSectionType } from "../sections-context/types";
import { ActionsFormEnums } from "@/enums";
import { Topic } from "@/components/molecules/Topic/types";

export const TopicsContext = createContext<TopicsTypes>({
  topics: [],
  setTopics: () => {},
  showModal: false,
  setShowModal: () => {},
  idSection: undefined,
  setIdSection: () => {},
  idTopic: undefined,
  setIdTopic: () => {},
  sections: [],
  setSections: () => {},
  action: undefined,
  setAction: () => {},
});

export function TopicsContextProvider({
  children,
}: TopicscontextProviderProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [infoSection, setInfoSection] = useState<InfoSectionType[]>([]);
  const [idSection, setIdSection] = useState<number | undefined>();
  const [idTopic, setIdTopic] = useState<number | undefined>();
  const [action, setAction] = useState<ActionsFormEnums>();

  return (
    <TopicsContext.Provider
      value={{
        sections: infoSection,
        setSections: setInfoSection,
        idSection,
        setIdSection,
        showModal,
        setShowModal,
        action,
        setAction,
        idTopic,
        setIdTopic,
        topics,
        setTopics,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export default TopicsContext;
