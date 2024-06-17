import { Dispatch, ReactNode, SetStateAction } from "react";
import { ActionsFormEnums } from "@/enums";

export type PropsSectionTypes = {
  infoSection: InfoSectionType;
  setInfoSection: Dispatch<SetStateAction<InfoSectionType>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export type InfoSectionType = {
  sectionType?: ActionsFormEnums;
  id?: number;
  title?: string;
  slug?: string;
  message?: string;
  icon?: string;
  active?: boolean;
};

export interface SectioncontextProviderProps {
  children: ReactNode;
}
