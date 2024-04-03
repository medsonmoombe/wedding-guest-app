import React from "react";
import "./Slider.css";


export const Slide = React.memo(function (StackedCarouselSlideProps) {
  const {
    data,
    dataIndex,
    isCenterSlide,
    swipeTo,
    slideIndex,
    openModal,
  } = StackedCarouselSlideProps as any;

  const coverImage = data[dataIndex].image;

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
        <div className="discription" onClick={()=> openModal(coverImage)} >
          <img
            style={{ width:'100%' }}
            alt="j"
            className="cover-image"
            src={coverImage}
          />
        </div>
      </div>
    </div>
  );
});
