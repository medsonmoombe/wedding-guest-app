import {
  StackedCarousel,
  ResponsiveContainer
} from "react-stacked-center-carousel";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Slide } from "./Carousel";
import { useState } from "react";
import '../modal/styles.css';
import {backgrounds} from '../function/index';


const data = backgrounds.map((image, index) => {
  return {
    image,
    text: `Image ${index + 1}`
  };
});

const CardCarousel = () => {
  const [modalImage, setModalImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card" style={{ width: '100%'}}>
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
                data={data}
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
        <ModalCloseButton bg={'gray.50'} color={'gray.700'} borderWidth={0} fontWeight={'bold'} borderRadius={'5px'}  />
          <ModalBody p={0} onClick={closeModal} >
            <img src={modalImage} alt="modal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CardCarousel;
