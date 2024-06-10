"use client";
import { createContext, useState } from "react";
import { PropsSectionTypes, adminProviderProps, paginationType } from "./types";

export const AdminContext = createContext<PropsSectionTypes>({
  showModal: false,
  setShowModal: () => {},
  pagination: {
    take: undefined,
    skip: undefined,
  },
  setPagination: () => {},
});

export function AdminContextProvider({ children }: adminProviderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<paginationType>({
    take: undefined,
    skip: undefined,
  });

  return (
    <AdminContext.Provider
      value={{ showModal, setShowModal, pagination, setPagination }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContext;
