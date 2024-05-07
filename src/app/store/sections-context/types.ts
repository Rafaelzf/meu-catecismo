import { Dispatch, ReactNode, SetStateAction } from "react";
import { ActionsFormSectionsEnums } from "@/enums";

export type PropsSectionTypes = {
  infoSection: InfoSectionType;
  setInfoSection: Dispatch<SetStateAction<InfoSectionType>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export type InfoSectionType = {
  sectionType?: ActionsFormSectionsEnums;
  id?: number;
  title?: string;
  slug?: string;
  message?: string;
  image?: string;
  active?: boolean;
};

export interface SectioncontextProviderProps {
  children: ReactNode;
}
