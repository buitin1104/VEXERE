import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalCommon = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('Modal Title');
  const [modalActions, setModalActions] = useState([]);

  const onOpen = ({
    view,
    title = 'Modal Title',
    actions = [],
    showFooter = true,
  }) => {
    setModalContent(view);
    setModalTitle(title);
    setModalActions(actions);
    setIsOpen(true);
    setIsShowFooter(showFooter);
  };

  const onClose = () => {
    console.log('close');

    setModalContent(null);
    setModalTitle('Modal Title');
    setModalActions([]);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ onOpen, onClose }}>
      {children}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{modalContent}</ModalBody>
              <ModalFooter>
                {isShowFooter && (
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                )}
                {modalActions.map((action, index) => (
                  <Button
                    key={index}
                    {...action.props}
                    onPress={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};
