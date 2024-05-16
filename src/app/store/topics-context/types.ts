import { Dispatch, ReactNode, SetStateAction } from "react";
import { InfoSectionType } from "../sections-context/types";

export type TopicsTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  idSection?: number;
  setIdSection: Dispatch<SetStateAction<number>>;
  sections: InfoSectionType[];
  setSections: Dispatch<SetStateAction<InfoSectionType[]>>;
};

export interface TopicscontextProviderProps {
  children: ReactNode;
}
