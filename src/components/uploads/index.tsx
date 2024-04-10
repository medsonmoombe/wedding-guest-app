import React, { useRef, useState } from "react";
import { Grid, GridItem, Box, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, IconButton } from "@chakra-ui/react";
import { backgrounds } from "../function";
import { FaExpand, FaPlus } from "react-icons/fa";

const images = backgrounds;

const ImageGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      // Process the uploaded file (e.g., upload to server)
      console.log("Uploaded file:", file);
    }
  };

  const handleClickPlusIcon = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} px={4} mb={'100px'}>
      <IconButton
            aria-label="Upload"
            icon={<FaPlus />}
            bg={'blue.100'}
            width={'50px'}
            height={'50px'}
            borderRadius={'50%'}
            border={'1px solid'}
            borderColor={'gray.400'}
            color={'blue.400'}
            position="fixed"
            top="75%"
            right="15px"
            zIndex="999"
            onClick={handleClickPlusIcon}
          />
            <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
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
