import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalCommon = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('Modal Title');
  const [size, setSize] = useState('sm');
  const onOpen = ({ view, title = 'Modal Title', size = 'sm' }) => {
    setModalContent(view);
    setModalTitle(title);
    setIsOpen(true);
    setSize(size);
  };

  const onClose = () => {
    setModalContent(null);
    setModalTitle('Modal Title');
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ onOpen, onClose }}>
      {children}
      <Modal isOpen={isOpen} onOpenChange={onClose} size={size}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{modalContent}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};
