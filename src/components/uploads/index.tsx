import React, { useRef, useState } from "react";
import { Grid, GridItem, Box, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, IconButton, useToast, Center, Spinner, Text } from "@chakra-ui/react";
import { FaExpand, FaPlus } from "react-icons/fa";
import axios from "axios";
import { base_url } from "../constants/enviroments";
import SquareGridSkeleton from "./Skeleton";
import { useMutation, useQueryClient } from "react-query";

interface ImageGridProps {
  photos: any[];
  isFetchingImages: boolean;
}

const ImageGrid = ({ photos, isFetchingImages }: ImageGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ isUploadedFile, setIsUploadedFile ] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const images = photos.length > 0 ? photos :[];

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



  const { mutateAsync, isLoading  } = useMutation(
    async (file: File) => {
      const url = await axios.get(`${base_url}/s3Url`);
      if (url && isConfirmed) {
        const result = await axios.put(url.data.url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (result.status === 200) {
          toast({
            title: "Imagem enviada com sucesso",
            description: "A imagem foi enviada com sucesso.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allImages'] });
      }
    }
  );

  const handleClickPlusIcon = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if(file) {
      setSelectedFile(URL.createObjectURL(file));
      setIsUploadedFile(true);
    }else {
      setIsUploadedFile(false);
      setSelectedFile('');
    }
    try {
      if(isConfirmed) {
      await mutateAsync(file);
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer upload da imagem",
        description: "Ocorreu um erro ao fazer upload da imagem, tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleCloseConfirmationModal = () => {
    setIsConfirmed(false);
    setIsUploadedFile(false);
  };

  const handleConfirmUpload = () => {
    setIsConfirmed(true);
    // setIsOpen(false);
  };

  return (
    <>

      <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md:"repeat(4, 1fr)",lg: "repeat(6, 1fr)"}} gap={4} px={4} mb={'100px'}>
      <IconButton
            aria-label="Upload"
            icon={ isLoading ? <Spinner size={'sm'} /> : <FaPlus />}
            bg={'blue.100'}
            width={'50px'}
            height={'50px'}
            borderRadius={'50%'}
            border={'1px solid'}
            borderColor={'gray.400'}
            color={'gray.500'}
            position="fixed"
            isDisabled={isLoading}
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
            onChange={handleSubmit}
          />
        {images?.map((image, index) => (
          <GridItem key={index}
          style={{ boxShadow: "8px 8px 8px 8px rgba(0, 0, 0, 0.1)"}}
          >
            <Box
              borderWidth="2px"
              borderRadius={'5px'}
              borderColor={'white'}
              overflow="hidden"
              cursor="pointer"
              style={{ boxShadow: "4px 4px 8px 4px rgba(0, 0, 0, 0.1)"}}
              // boxShadow="4px 4px 8px 4px rgba(0, 0, 0, 0.1)"
              position={'relative'}
              onClick={() => handleImageClick(index)}
            >
              <Image src={image} alt={`Image ${index}`} 
               minHeight="160px"
               maxHeight="160px"
               width="100%"
               borderRadius={'5px'}
               objectFit="cover"
              />
               <div style={{ position: "absolute", top: "1px", right: "1px", display:"none" }}  >
                <IconButton
                  aria-label="Expand"
                  icon={<FaExpand />}
                  bg={'gray.100'}
                  width={'0px'}
                  height={'30px'}
                  borderRadius={0}
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

        {/* render the skeleton in grid if isFetchingImages is true */}
       {isFetchingImages && <Center>
        <SquareGridSkeleton/>
        </Center>}
      </Grid>

<Modal isOpen={isOpen} onClose={handleCloseModal}>
  <ModalOverlay 
   bg="rgba(0, 0, 0, 0.6)"
   backdropFilter="blur(2px)"
  />
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

{/* Confirmation modal */}
<Modal isOpen={isUploadedFile} onClose={handleCloseConfirmationModal} size={'sm'} >
  <ModalOverlay />
  <ModalContent>
    <ModalBody>
      <Box>
        <Text fontSize="lg" fontWeight="bold" textAlign={'center'} mb={4}>
          Confirmar upload da imagem?
        </Text>
        <Image src={selectedFile} alt="Uploaded Image" width="100%" height="150px" objectFit="contain" />
      </Box>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={handleConfirmUpload}>
        Confirmar
      </Button>
      <Button onClick={handleCloseConfirmationModal}>Cancelar</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
};

export default ImageGrid;
