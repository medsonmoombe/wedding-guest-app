import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer
} from "react-stacked-center-carousel";
import img1 from '../../assets/images/img-1.jpg';
import img2 from '../../assets/images/img-2.jpg';
import img3 from '../../assets/images/img-3.jpg';
import "./Slider.css";
import { Slide } from "./Carousel";

const data = [
  {
    image: img1,
    text: "one"
  },
  {
    image: img2,
    text: "two"
  },
  {
    image: img1,
    text: "three"
  },
  {
    image: img2,
    text: "four"
  },
  {
    image: img3,
    text: "five"
  },
  {
    image: img1,
    text: "six"
  },
  {
    image: img3,
    text: "seven"
  },
  {
    image: img2,
    text: "eight"
  }
];

function Pagination(props: { centerSlideDataIndex: any; updatePosition?: any; }) {
  const { centerSlideDataIndex, updatePosition } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: 20
      }}
    >
      {data.map((_, index) => {
        const isCenterSlide = props.centerSlideDataIndex === index;
        return (
          <div
            onClick={() => {
              updatePosition(index);
            }}
            style={{
              height: 15,
              width: 15,
              borderRadius: "100%",
              background: isCenterSlide ? "black" : "none",
              border: "1px solid black",
              cursor: "pointer"
            }}
          />
        );
      })}
    </div>
  );
}

const CardCarousel = () => {
  const ref = React.useRef(StackedCarousel);
  const [centerSlideDataIndex, setCenterSlideDataIndex] = React.useState(0);
  const onCenterSlideDataIndexChange = (newIndex) => {
   setCenterSlideDataIndex(newIndex);
  };

  const updatePosition = (index) => {
    ref?.current?.swipeTo(index - centerSlideDataIndex);
  };

  return (
    <div className="card" style={{ width: '100%'}}>
      <div style={{ width: "100%", position: "relative" }}>
        <ResponsiveContainer
          carouselRef={ref as any}
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={160}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
                onActiveSlideChange={onCenterSlideDataIndexChange}
              />
            );
          }}
        />
        {/* <Fab
          className="card-button left"
          size="small"
          onClick={() => ref.current?.goBack()}
        >
          <KeyboardArrowLeftIcon style={{ fontSize: 30 }} />
        </Fab>
        <Fab
          className="card-button right"
          size="small"
          onClick={() => ref.current?.goNext()}
        >
          <KeyboardArrowRightIcon style={{ fontSize: 30 }} />
        </Fab> */}
      </div>
      {/* <Pagination
        updatePosition={updatePosition}
        centerSlideDataIndex={centerSlideDataIndex}
      /> */}
    </div>
  );
};

export default CardCarousel;