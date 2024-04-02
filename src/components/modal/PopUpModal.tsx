import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, chakra } from "@chakra-ui/react";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
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
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
            <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center">
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