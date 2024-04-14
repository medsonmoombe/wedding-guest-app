import { Slide } from "./Carousel";
import { StackedCarousel, ResponsiveContainer } from "react-stacked-center-carousel";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import '../modal/styles.css';
import { backgrounds } from '../function/index';


const CardCarousel = () => {
  const [modalImage, setModalImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const data = photos.length > 0 ? photos.map((image, index) => {
  //   return {
  //     image,
  //     text: `Image ${index + 1}`
  //   };
  // }) : backgrounds.map((image, index) => {
  //   return {
  //     image,
  //     text: `Image ${index + 1}`
  //   };
  // });

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    // setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handlePreviousImage = () => {
  //   const newIndex = (currentImageIndex - 1 + data.length) % data.length;
  //   setModalImage(data[newIndex].image);
  //   setCurrentImageIndex(newIndex);
  // };

  // const handleNextImage = () => {
  //   const newIndex = (currentImageIndex + 1) % data.length;
  //   setModalImage(data[newIndex].image);
  //   setCurrentImageIndex(newIndex);
  // };


  function preprocessPhotos(photos: any[], width: any) {
    return photos.map((photo:  any) => {
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
  

  const processedPhotos = preprocessPhotos(backgrounds, 100);


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
          <ModalCloseButton bg={'gray.50'} color={'gray.700'} borderWidth={0} fontWeight={'bold'} borderRadius={'5px'} />
          <ModalBody p={0}>
            <img src={modalImage} alt="modal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={handlePreviousImage}>Anterior</Button>
            <Button ml={2} onClick={handleNextImage}>Próxima</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CardCarousel;
