"use client";
import { createContext, useState } from "react";
import { TopicsTypes, TopicscontextProviderProps } from "./types";
import { InfoSectionType } from "../sections-context/types";

export const TopicsContext = createContext<TopicsTypes>({
  showModal: false,
  setShowModal: () => {},
  idSection: undefined,
  setIdSection: () => {},
  sections: [],
  setSections: () => {},
});

export function TopicsContextProvider({
  children,
}: TopicscontextProviderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [infoSection, setInfoSection] = useState<InfoSectionType[]>([]);
  const [idSection, setIdSection] = useState<number>(12);

  return (
    <TopicsContext.Provider
      value={{
        sections: infoSection,
        setSections: setInfoSection,
        idSection,
        setIdSection,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export default TopicsContext;
