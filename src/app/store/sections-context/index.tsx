import { createContext, useState } from "react";
import {
  PropsSectionTypes,
  InfoSectionType,
  SectioncontextProviderProps,
} from "./types";

export const Sectioncontext = createContext<PropsSectionTypes>({
  showModal: false,
  setShowModal: () => {},
  infoSection: {
    sectionType: undefined,
    title: undefined,
    slug: undefined,
    message: undefined,
    image: undefined,
    active: undefined,
  },
  setInfoSection: () => {},
});

export function SectioncontextProvider({
  children,
}: SectioncontextProviderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [infoSection, setInfoSection] = useState<InfoSectionType>({
    sectionType: undefined,
    title: undefined,
    slug: undefined,
    message: undefined,
    image: undefined,
    active: undefined,
  });

  return (
    <Sectioncontext.Provider
      value={{ showModal, setShowModal, infoSection, setInfoSection }}
    >
      {children}
    </Sectioncontext.Provider>
  );
}

export default Sectioncontext;
