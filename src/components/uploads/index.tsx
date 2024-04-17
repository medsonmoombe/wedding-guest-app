import React, { useEffect, useRef, useState } from "react";
import { Grid, GridItem, Box, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, IconButton, useToast, Center, Text, Spinner } from "@chakra-ui/react";
import { FaExpand, FaPlus } from "react-icons/fa";
import axios from "axios";
import { base_url } from "../constants/enviroments";
import SquareGridSkeleton from "./Skeleton";
import { useMutation, useQueryClient } from "react-query";
import { IoMdArrowRoundBack, IoMdArrowRoundForward  } from "react-icons/io";
import './styles.css';
import Resizer from "react-image-file-resizer";


interface ImageGridProps {
  photos: any[];
  isFetchingImages: boolean;
}

const ImageGrid = ({ photos, isFetchingImages }: ImageGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ isUploadedFile, setIsUploadedFile ] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMultipleFiles, setIsMultipleFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();
  


  const images = photos.length > 0 ? photos : [];

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

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        2000,
        2000,
        "JPEG",
        60,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "file"
      );
    });


  const { mutateAsync, isLoading } = useMutation(

      // first resize the each image using the resizeFile imported from function and then upload it to S3
    async (files: FileList) => {
      const promises = Array.from(files).map(async (file) => {
        const resizedImage = await resizeFile(file);
        const urlResponse = await axios.get(`${base_url}/s3Url`);
        const url = urlResponse.data.url;
        if (url) {
          return axios.put(url, resizedImage, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      });
  
      return Promise.all(promises);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allImages'] });
        setIsConfirmed(false);
        setIsUploadedFile(false);
      },
    }
  
  );
  


  const handleClickPlusIcon = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);
    if(files.length === 1) {
      setSelectedFile(URL.createObjectURL(files[0]));
      setIsUploadedFile(true);
    }else if(files.length > 1){
      setIsMultipleFiles(true);
      setIsUploadedFile(true);
      setSelectedFile('');
    }else {
      setIsUploadedFile(false);
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmed(false);
    setIsUploadedFile(false);
  };

  const handleComfirm = async() => {
    setIsConfirmed(true);
  
    try {
      await mutateAsync(fileInputRef.current?.files as any);

      // while image is uploading, close the confirmation modal
      handleCloseConfirmationModal();
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

useEffect(() => {
  handleCloseConfirmationModal();
}, [isConfirmed]);


function imageOrientation(src: string) {

  var orientation,
  img = new window.Image();
  img.src = src;

  if (img.naturalWidth > img.naturalHeight) {
      orientation = 'landscape';
  } else if (img.naturalWidth < img.naturalHeight) {
      orientation = 'portrait';
  }

  return orientation;

}


  return (
    <>

      <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md:"repeat(4, 1fr)",lg: "repeat(6, 1fr)"}} gap={4} px={4} mb={'100px'}>
      <IconButton
            aria-label="Upload"
            icon={ isLoading ? <Spinner size={'sm'} /> : <FaPlus />}
            bg={'blue.100'}
            style={{ boxShadow: "2px 2px 4px 2px"}}
            width={'50px'}
            height={'50px'}
            borderRadius={'50%'}
            border={'1px solid'}
            borderColor={'gray.400'}
            color={'gray.500'}
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
            onChange={handleSubmit}
            multiple
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
               onError={() => console.log("ERROR LOADING IMAGE: ", image)}
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
    <ModalCloseButton border={'1px solid'} borderColor={'gray.400'} bg={'gray.50'} zIndex={99} color={'black'} fontWeight={'bold'} />
    <ModalBody width={'100%'} height={'300px'}>
      <Box pos={'relative'} >
      <Image 
        className="image-modal"
        src={images[currentImageIndex]} 
        alt={`Image ${currentImageIndex}`}  
        objectFit={ imageOrientation(images[currentImageIndex]) === 'landscape' ? 'contain' : 'cover'}
        margin={'auto'} 
      />
      <IconButton
      aria-label="back"
      icon={<IoMdArrowRoundBack size={20} style={{ zIndex: 99, color:"black", fontWeight:"bold"}} />}
      bg="rgba(243, 246, 241, 0.73)" opacity={0}
      width={'30%'}
      height={'80%'}
      border={'1px solid'}
      borderColor={'gray.400'}
      color={'gray.500'}
      onClick={handlePreviousImage} 
      position={'absolute'} 
      left={0} ml={1} 
      top={'10%'}
      />
      <IconButton
      aria-label="back"
      icon={<IoMdArrowRoundForward size={20} style={{ zIndex: 99, color:"black", fontWeight:"bold"}}/>}
      bg="rgba(243, 246, 241, 0.73)"
       opacity={0}
      width={'30%'}
      height={'80%'}
      border={'1px solid'}
      borderColor={'gray.400'}
      color={'gray.500'}
      onClick={handleNextImage} 
      position={'absolute'} 
      right={0} mr={1} 
      top={'10%'}
      />
      </Box>
    </ModalBody>
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

        { isMultipleFiles ? (
          <Text fontSize="sm" color="gray.500" textAlign={'center'} mb={4}>
            {fileInputRef.current?.files?.length} imagens selecionadas
          </Text>
        
        ) : <Image src={selectedFile} alt="Uploaded Image" width="100%" height="150px" objectFit="contain" />}
      </Box>
    </ModalBody>
    <ModalFooter>
      <Button isLoading={isLoading} colorScheme="blue" mr={3} onClick={handleComfirm} >
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
