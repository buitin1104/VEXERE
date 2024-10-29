import { Modal } from '@chakra-ui/react';
import { useGlobalModalStore } from 'src/stores/global-modal';

export const GlobalModalWrapper = () => {
  const {
    closeModal,
    state: { isOpen, view, modalSize, closeOnOverlayClick, closeOnEsc },
  } = useGlobalModalStore();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      isCentered
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
    >
      <ModalOverlay />
      <ModalContent
        className="font-poppins"
        maxW={modalSize ?? '720px'}
        rounded="2rem"
      >
        <ModalBody p={0} overflow="hidden">
          {view}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
