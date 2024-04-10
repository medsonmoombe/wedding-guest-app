import React, { useState } from "react";
import { Grid, GridItem, Box, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, IconButton } from "@chakra-ui/react";
import { backgrounds } from "../function";
import { FaExpand } from "react-icons/fa";

const images = backgrounds;

const ImageGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: React.SetStateAction<number>) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} px={4} mb={'100px'}>
        {images.map((image, index) => (
          <GridItem key={index}>
            <Box
              borderWidth="5px"
              borderRadius="5px"
              borderColor={'white'}
              overflow="hidden"
              cursor="pointer"
              boxShadow={'lg'}
              position={'relative'}
              onClick={() => handleImageClick(index)}
            >
              <Image src={image} alt={`Image ${index}`} 
               minHeight="300px"
               maxHeight="300px"
               width="100%"
               objectFit="cover"
              />
               <div style={{ position: "absolute", top: "2px", right: "2px" }}>
                <IconButton
                  aria-label="Expand"
                  icon={<FaExpand />}
                  bg={'gray.100'}
                  color={'black'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(index);
                  }}
                />
                </div>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
  <ModalOverlay />
  <ModalContent>
    <ModalCloseButton border={'1px solid'} borderColor={'gray.400'} bg={'gray.50'} color={'black'} fontWeight={'bold'} />
    <ModalBody width={'100%'} height={'300px'}>
      <Image 
        src={images[currentImageIndex]} 
        alt={`Image ${currentImageIndex}`} 
        width={'100%'} 
        height={'100%'} 
        objectFit={'cover'} 
      />
    </ModalBody>
    <ModalFooter>
      <Button onClick={handlePreviousImage}>Anterior</Button>
      <Button ml={2} onClick={handleNextImage}>Próxima</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
};

export default ImageGrid;
