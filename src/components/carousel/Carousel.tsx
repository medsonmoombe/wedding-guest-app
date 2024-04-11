import React, { useEffect, useRef, useState } from "react";
import { FaExpand } from 'react-icons/fa';
import "./Slider.css";
import { Img, Box, Text } from "@chakra-ui/react";

export const Slide = React.memo(function (StackedCarouselSlideProps) {
  const {
    data,
    dataIndex,
    isCenterSlide,
    swipeTo,
    slideIndex,
    openModal,
    cardHeight,
  } = StackedCarouselSlideProps as any;

  const coverImage = data[dataIndex]?.image || data[dataIndex]?.src || data[dataIndex];
  
  const imageWidth = coverImage.width;
  const imageHeight = coverImage.height;

  const imageRatio = imageWidth / imageHeight;
  const cardWidth = cardHeight * imageRatio;

  const fitsCard = imageWidth <= cardWidth && imageHeight <= cardHeight;

  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useEffect(() => {
    if (isCenterSlide && targetRef.current && data[dataIndex]?.src === coverImage) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, [isCenterSlide, dataIndex, data[dataIndex]?.src, coverImage]);
  

  console.log(dimensions);

  return (
    <div className="card-card" draggable={false}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div className="detail fill">
        <Box
          display="flex"
          flexDirection={'column'}
          justifyContent="center"
          alignItems={fitsCard ? "center" : "flex-start"}
          height={cardHeight}
        >
            {dimensions.width > dimensions.height  && <Box height={'10%'} backdropFilter="blur(2px)" className="blured-img" >
            <Img src={coverImage}  alt="blured"  className="img-bl" />
            </Box>}
          <Box >
         
            <Img
              alt="picture_photo"
              // height={"80%"}
              width={"100%"}
              maxHeight={ dimensions.width > dimensions.height ? "100%" : "100%"}
              minHeight={dimensions.width > dimensions.height ? "100%" : "100%"}
              objectFit="contain"
              ref={targetRef}
              onClick={() => openModal(coverImage)}
              src={coverImage}
            />
          </Box>
            {dimensions.width > dimensions.height  && <Box  height={'10%'} backdropFilter="blur(2px)" className="blured-img">
            <Img src={coverImage}  alt="blured" backdropFilter="blur(2px)" className="img-bl" />
            </Box>}
        </Box>
        <div className="icon-container">
          <FaExpand
            className="expand-icon"
            onClick={() => openModal(coverImage)}
          />
        </div>
      </div>
    </div>
  );
});
