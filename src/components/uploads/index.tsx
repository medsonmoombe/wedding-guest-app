import React, { useEffect, useRef, useState } from "react";
import { Grid, GridItem, Box, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, IconButton, Center, Text, Flex, Button } from "@chakra-ui/react";
import { FaExpand, FaPlus } from "react-icons/fa";
import SquareGridSkeleton from "./Skeleton";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import './styles.css';
import pt_flag from "../../assets/images/portug_flag.png";
import eng_flag from "../../assets/images/flag_Uk.png";
import insta_icon from '../../assets/images/insta.webp';
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { displayImagesAtom, imagesAtom } from "../../recoil/atom";
import { IoImagesOutline } from "react-icons/io5";


interface ImageGridProps {
  isFetchingImages: boolean;
}

const ImageGrid = ({ isFetchingImages }: ImageGridProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadedFile, setIsUploadedFile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const photos = useRecoilValue(imagesAtom);
  const [openSocialModal, setOpenSocialModal] = useState(false);

  const fetchedImages = useRecoilValue(displayImagesAtom);

  const icons = fetchedImages.length > 0 ? fetchedImages?.filter((url: string) => {
   return url.endsWith('world-wide-web.png') ||
   url.endsWith('facebook.png') ||
   url.endsWith('instagram.png')
 }) : [];


  const images = photos.length > 0 ? photos : [];
  const whatAlink = `https://wa.me/+258844530132, gostaria de partilhar as minhas fotos com Judith e Robert. Obrigado!`;
  

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

  const handleOpenSocialModal = () => {
    setOpenSocialModal(true);
  }


  const handleCloseSocialModal = () => {
    setOpenSocialModal(false);
  }

  // const resizeFile = (file: any) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       2000,
  //       2000,
  //       "JPEG",
  //       60,
  //       0,
  //       (uri: any) => {
  //         resolve(uri);
  //       },
  //       "file"
  //     );
  //   });


  // const { mutateAsync, isLoading } = useMutation(
  //   // first resize the each image using the resizeFile imported from function and then upload it to S3
  //   async (files: FileList) => {
  //     const promises = Array.from(files).map(async (file) => {
  //       const resizedImage = await resizeFile(file);
  //       const urlResponse = await axios.get(`${base_url}/s3Url`);
  //       const url = urlResponse.data.url;
  //       if (url) {
  //         return axios.put(url, resizedImage, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });
  //       }
  //     });

  //     return Promise.all(promises);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['allImages'] });
  //       setIsConfirmed(false);
  //       setIsUploadedFile(false);
  //     },
  //   }

  // );



  const handleClickPlusIcon = () => {
    setIsUploadedFile(true);
    // if (fileInputRef.current) {
    //   fileInputRef.current.click();
    // }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);
    if (files.length === 1) {
      setIsUploadedFile(true);
    } else if (files.length > 1) {
      setIsUploadedFile(true);
    } else {
      setIsUploadedFile(false);
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmed(false);
    setIsUploadedFile(false);
  };

  // const handleComfirm = async () => {
  //   setIsConfirmed(true);

  //   try {
  //     await mutateAsync(fileInputRef.current?.files as any);

  //     // while image is uploading, close the confirmation modal
  //     handleCloseConfirmationModal();
  //   } catch (error) {
  //     toast({
  //       title: "Erro ao fazer upload da imagem",
  //       description: "Ocorreu um erro ao fazer upload da imagem, tente novamente mais tarde.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // }

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

  const instaLink = 'https://www.instagram.com/folhaverde.mz/';
  const fbLink = 'https://web.facebook.com/folhaverde.mz/?locale=pt_BR&_rdc=1&_rdr';
  const webLink = 'https://www.folhaverdemz.com/';


  return (
    <>

      <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(6, 1fr)" }} gap={4} px={4} mb={'100px'}>

        <IconButton
          aria-label="Upload"
          icon={<>
          {/* <Link to={instaLink} target="_blank" > */}
        <Image position={'fixed'} top={'66%'} right={'20px'}  zIndex={999} src={insta_icon} alt="insta" p={1}    borderRadius={'50%'} width={'50px'} height={'50px'} />
        {/* </Link> */}
          </>}
          bg={'white'}
          width={'60px'}
          height={'60px'}
          borderRadius={'50%'}
          borderColor={'gray.500'}
          boxShadow={'lg'} 
          color={'transparent'}
          border={'2px solid teal'}
          position="fixed"
          top="65%"
          right="15px"
          variant={'none'}
          zIndex="999"
          onClick={handleOpenSocialModal}
        />

        <IconButton
          aria-label="Upload"
          icon={<FaPlus />}
          bg={'#57BA63'}
          width={'50px'}
          height={'50px'}
          borderRadius={'50%'}
          border={'1px solid'}
          borderColor={'#fff'}
          color={'white'}
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
        {images?.map((image: any, index: any) => (
          <GridItem key={index}
            style={{ boxShadow: "8px 8px 8px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <Box
              borderWidth="2px"
              borderRadius={'5px'}
              borderColor={'white'}
              overflow="hidden"
              cursor="pointer"
              style={{ boxShadow: "4px 4px 8px 4px rgba(0, 0, 0, 0.1)" }}
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
              <div style={{ position: "absolute", top: "1px", right: "1px", display: "none" }}  >
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


        {isFetchingImages && photos.length  === 0 &&  <Center>
          <SquareGridSkeleton />
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
                objectFit={imageOrientation(images[currentImageIndex]) === 'landscape' ? 'contain' : 'cover'}
                margin={'auto'}
              />
              <IconButton
                aria-label="back"
                icon={<IoMdArrowRoundBack size={20} style={{ zIndex: 99, color: "black", fontWeight: "bold" }} />}
                bg="rgba(243, 246, 241, 0.73)" opacity={0}
                width={'30%'}
                height={'80%'}
                outline={'none'}
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
                icon={<IoMdArrowRoundForward size={20} style={{ zIndex: 99, color: "black", fontWeight: "bold" }} />}
                bg="rgba(243, 246, 241, 0.73)"
                opacity={0}
                width={'30%'}
                outline={'none'}
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
      <Modal isOpen={isUploadedFile} onClose={handleCloseConfirmationModal} size={'md'} >
        <ModalOverlay />
        <ModalContent>
        <ModalCloseButton border={'1px solid'} borderColor={'gray.400'} bg={'gray.50'} zIndex={99} color={'black'} fontWeight={'bold'} />
          <ModalBody mt={10}>
            <Box width={'full'} px={4} pt={8}>
              <Flex align="start" justify="start" direction="column"  mb={8} width={'full'}>
                <Image src={pt_flag} alt="pt_flag" width="50px" height="20px" objectFit="contain" />
                <Text color="gray.700" fontWeight={500} mb={4} >
                  Compartilhe suas belas fotos com Judith e Robert
                </Text>
              </Flex>
              <Flex align="start" justify="start" direction="column"  mb={4} width={'full'}>
                <Image src={eng_flag} alt="engl_flag" width="50px" height="20px" objectFit="contain" />
                <Text color="gray.700" fontWeight={500}  mb={4}>
                  Share your beautiful pictures with Judith and Robert
                </Text>
              </Flex>

            </Box>
          </ModalBody>
          <ModalFooter>
            <Center width={'full'} px={4}>
            <Link to={whatAlink} style={{ width: '60%'}} >
              <Button
                colorScheme="whatsapp"
                variant="solid"
                outline={'none'}
                size="md"
                width={'100%'}
                height={'50px'}
                borderRadius={'10px'}
                justifyContent={'center'}
                gap={3}
                mb={8}
                >
                <IoImagesOutline size={30}  color="gray.600" />
                <Text color="white" fontWeight={500} fontSize={'md'}>WhatsApp</Text>
                </Button>
              </Link>
              </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>


      
      {/* social modal */}
      <Modal isOpen={openSocialModal} onClose={handleCloseSocialModal} size={'md'} >
        <ModalOverlay />
        <ModalContent>
        <ModalCloseButton border={'1px solid'} borderColor={'gray.400'} bg={'gray.50'} zIndex={99} color={'black'} fontWeight={'bold'} />
          <ModalBody mt={10}>
            <Box width={'full'} px={4} pt={8}>
              <Flex align="center" justify="center" direction={'column'}  mb={8} width={'full'}>
              <Image  zIndex={999} src={insta_icon} alt="insta" p={1} border={'2px solid teal'} boxShadow={'lg'}   borderRadius={'50%'} width={'80px'} height={'80px'} />
              <Text color="gray.700" fontWeight={'bold'} fontSize={'xl'} mt={4} >
                  Folha Verde
                </Text>
              </Flex>
              <Flex align="start" justify="start" direction="column"  mb={4} width={'full'} ml={4}>
                 <Text color="black" fontWeight={500} textTransform={'capitalize'}>
                  Perfomance & event venue
                </Text>
                <Text color="gray.700" fontWeight={500} fontSize={'sm'} >
                  Nors melhores memontos da sua vida!
                  </Text>
                  <Text color="gray.700" fontWeight={500} fontSize={'sm'} >
                  Contacto: 82 300 4683
                  </Text>
                  <Text color="gray.700" fontWeight={500} fontSize={'sm'} >
                  Commercial@folhaverdemz.com
                  </Text>

                  <Text color="gray.700" fontWeight={500} fontSize={'sm'} >
                  Maputo: Av. Thomas Ndunda, 1288
                  </Text>

                  <Text color="gray.700" fontWeight={500} fontSize={'sm'} >
                  Matola : Rua de Empasse Parcela 856
                  </Text>
              </Flex>



            </Box>
          </ModalBody>
          <ModalFooter>
          <Center width={'full'} px={2} gap={4}>
            <IconButton
              aria-label="instagram"
              icon={<Image src={icons?.[2]} alt="insta" p={1}    width={'50px'} height={'50px'} />}
              width={'50px'}
              height={'50px'}
              zIndex="999"
              onClick={() => window.open(instaLink, "_blank")}
              />
              <IconButton
              aria-label="facebook"
              icon={<Image src={icons?.[1]}  alt="facebook" p={1}    width={'50px'} height={'50px'}/>}
              width={'50px'}
              height={'50px'}
              zIndex="999"
              onClick={() => window.open(fbLink, "_blank")}
              />
              <IconButton
              aria-label="web"
              icon={<Image src={icons?.[0]} alt="web" p={1}    width={'50px'} height={'50px'} />}
              width={'50px'}
              height={'50px'}
              zIndex="999"
              onClick={() => window.open(webLink, "_blank")}
              />
              </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default ImageGrid;
