import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, chakra } from "@chakra-ui/react";
import './styles.css';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function CustomModal({
    isOpen,
    onClose,
    title,
    children
}: CustomModalProps) {
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} size={'sm'}>
          <ModalOverlay />
          <ModalContent bg="rgba(243, 246, 241, 0.73)" opacity={0.5} >
            <ModalHeader>
              <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center" color="black">
                {title}
              </chakra.h3>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>
  
      </>
    )
  }