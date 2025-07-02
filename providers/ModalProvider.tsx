// context/ModalContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "create-category" | "edit-category" | "delete" | null;

interface ModalContextType {
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalProps: any;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const openModal = (type: ModalType, props: any = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
