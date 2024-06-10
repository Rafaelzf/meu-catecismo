import { Dispatch, ReactNode, SetStateAction } from "react";
export type PropsSectionTypes = {
  pagination: paginationType;
  setPagination: Dispatch<SetStateAction<paginationType>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export type paginationType = {
  take?: number;
  skip?: number;
};

export interface adminProviderProps {
  children: ReactNode;
}
