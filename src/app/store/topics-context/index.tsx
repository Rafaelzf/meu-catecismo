"use client";
import { createContext, useState } from "react";
import { TopicsTypes, TopicscontextProviderProps } from "./types";
import { InfoSectionType } from "../sections-context/types";
import { ActionsFormEnums } from "@/enums";

export const TopicsContext = createContext<TopicsTypes>({
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [infoSection, setInfoSection] = useState<InfoSectionType[]>([]);
  const [idSection, setIdSection] = useState<number>(12);
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
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export default TopicsContext;
