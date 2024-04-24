import { Slide } from "./Carousel";
import { StackedCarousel, ResponsiveContainer } from "react-stacked-center-carousel";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import '../modal/styles.css';
import {backgrounds, imageOrientation } from '../function/index';
import { displayImagesAtom } from "../../recoil/atom";
import { useRecoilValue } from "recoil";


const CardCarousel = () => {
  const [modalImage, setModalImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fetchedImages = useRecoilValue(displayImagesAtom);

   const photos = fetchedImages.length > 0 ? fetchedImages?.filter((url: string) => {
    // if url is in this format https://wedding-photo-collection.s3.us-east-1.amazonaws.com/carousel-images/ end with / then return false

    if (url.endsWith('/')) {
      return false;
    }

    return !(url.endsWith('i-app.png') ||
    url.endsWith('ENG-compressed.svg') ||
    url.endsWith('pt-compressed.svg') ||
    url.endsWith('i-app1.png') ||
    url.endsWith('insta.webp') ||
    url.endsWith('love.png') || url.endsWith('world-wide-web.png') ||
    url.endsWith('facebook.png') ||
    url.endsWith('instagram.png')) ||
    url.endsWith('icon_2.jpg')
  }) : backgrounds;

  

  const openModal = (imageUrl: string, index: number) => {
    console.log('openModal', imageUrl);
    setModalImage(imageUrl);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePreviousImage = () => {
    const newIndex = (currentImageIndex - 1 + photos?.length) % photos?.length;
    setModalImage(photos?.[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % photos?.length;
    setModalImage(photos?.[newIndex]);
    setCurrentImageIndex(newIndex);
  };


  function preprocessPhotos (photos: any[], width: any) {
    return photos?.map((photo: any) => {
      return {
        src: photo,
        style: {
          width: `${width}%`,
          minHeight: `100%`,
          maxHeight: `100%`,
          objectFit: 'cover',
        },
      };
    });
  }

  const processedPhotos = preprocessPhotos(photos, 100);

  return (
    <div className="card" style={{ width: '100%' }}>
      <div style={{ width: "100%", position: "relative" }}>
        <ResponsiveContainer
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={(props) => (
                  <Slide {...props} openModal={openModal} />
                )}
                slideWidth={220}
                carouselWidth={width}
                data={processedPhotos}
                maxVisibleSlide={5}
                disableSwipe={false}
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
              />
            );
          }}
        />
        
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="sm">
        <ModalOverlay
          bg="transparent"
          css={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(10, 0, 50, 0.3)' }}
        />
        <ModalContent>
          <ModalCloseButton bg={'gray.50'} color={'gray.700'} borderWidth={0} fontWeight={'bold'} borderRadius={'5px'} zIndex={99}/>
          <ModalBody p={0}>
            <Flex justifyContent="space-between" alignItems="center" pos={'relative'}>
              <IconButton
                aria-label="Previous"
                position={'absolute'}
                left={0}
                top={'10%'}
                outline={'none'}
                bg="rgba(243, 246, 241, 0.73)" 
                opacity={0}
                width={'30%'}
                height={'80%'}
                icon={<FaArrowLeft />}
                onClick={handlePreviousImage}
                disabled={currentImageIndex === 0}
                variant="ghost"
              />
              <img src={modalImage} alt="modal" style={{ width: "100%", height: "100%", maxHeight: "500px", minHeight:"400px", objectFit: imageOrientation(modalImage) === 'landscape' ? 'contain' : 'cover'}} />
              <IconButton
                aria-label="Next"
                position={'absolute'}
                right={0}
                top={'10%'}
                outline={'none'}
                bg="rgba(243, 246, 241, 0.73)" 
                opacity={0}
                width={'30%'}
                height={'80%'}
                icon={<FaArrowRight />}
                onClick={handleNextImage}
                disabled={currentImageIndex === photos?.length - 1}
                variant="ghost"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CardCarousel;
