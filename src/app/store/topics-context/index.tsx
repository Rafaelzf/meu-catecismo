"use client";
import { createContext, useState } from "react";
import { TopicsTypes, TopicscontextProviderProps } from "./types";
import { InfoSectionType } from "../sections-context/types";

export const TopicsContext = createContext<TopicsTypes>({
  idSection: undefined,
  setIdSection: () => {},
  sections: [],
  setSections: () => {},
});

export function TopicsContextProvider({
  children,
}: TopicscontextProviderProps) {
  const [infoSection, setInfoSection] = useState<InfoSectionType[]>([]);
  const [idSection, setIdSection] = useState<number>(132);

  return (
    <TopicsContext.Provider
      value={{
        sections: infoSection,
        setSections: setInfoSection,
        idSection,
        setIdSection,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export default TopicsContext;
