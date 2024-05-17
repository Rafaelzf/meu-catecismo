import { Dispatch, ReactNode, SetStateAction } from "react";
import { InfoSectionType } from "../sections-context/types";
import { ActionsFormEnums } from "@/enums";

export type TopicsTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  idTopic?: number;
  setIdTopic: Dispatch<SetStateAction<number | undefined>>;
  idSection?: number;
  setIdSection: Dispatch<SetStateAction<number>>;
  sections: InfoSectionType[];
  setSections: Dispatch<SetStateAction<InfoSectionType[]>>;
  action?: ActionsFormEnums;
  setAction: Dispatch<SetStateAction<ActionsFormEnums | undefined>>;
};

export interface TopicscontextProviderProps {
  children: ReactNode;
}
