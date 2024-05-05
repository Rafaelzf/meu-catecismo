import { Dispatch, ReactNode, SetStateAction } from "react";

export type PropsSectionTypes = {
  infoSection: InfoSectionType;
  setInfoSection: Dispatch<SetStateAction<InfoSectionType>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export type InfoSectionType = {
  sectionType: string | undefined;
  title: string | undefined;
  slug: string | undefined;
  message: string | undefined;
  image: string | undefined;
  active: boolean | undefined;
};

export interface SectioncontextProviderProps {
  children: ReactNode;
}
