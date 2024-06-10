import { Dispatch, ReactNode, SetStateAction } from "react";
import { InfoSectionType } from "../sections-context/types";
import { ActionsFormEnums } from "@/enums";
import { Topic } from "@/components/molecules/Topic/types";

export type TopicsTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  topics: Topic[];
  setTopics: Dispatch<SetStateAction<Topic[]>>;
  idTopic?: number;
  setIdTopic: Dispatch<SetStateAction<number | undefined>>;
  idSection?: number;
  setIdSection: Dispatch<SetStateAction<number | undefined>>;
  sections: InfoSectionType[];
  setSections: Dispatch<SetStateAction<InfoSectionType[]>>;
  action?: ActionsFormEnums;
  setAction: Dispatch<SetStateAction<ActionsFormEnums | undefined>>;
};

export interface TopicscontextProviderProps {
  children: ReactNode;
}
