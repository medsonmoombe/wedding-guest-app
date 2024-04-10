import "./styles.css";
import { SetStateAction, useState } from "react";
import Slider from "react-slick";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { backgrounds } from "../function";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LuPlus } from "react-icons/lu";
import { Flex, IconButton, useToast } from "@chakra-ui/react";
import axios from "axios";
import { base_url } from "../constants/enviroments";

const images = backgrounds

function PhotosUploadsDisplay() {
//   const NextArrow = ({ onClick }: any) => {
//     return (
//       <div className="arrow next" onClick={onClick}>
//         <FaArrowRight />
//       </div>
//     );
//   };

//   const PrevArrow = ({ onClick }: any) => {
//     return (
//       <div className="arrow prev" onClick={onClick}>
//         <FaArrowLeft />
//       </div>
//     );
//   };

  const [imageIndex, setImageIndex] = useState(0);
  const toast = useToast();

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    beforeChange: (next: SetStateAction<number>) => setImageIndex(next),
  };


  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file as Blob);
    if (!file) {
        return;
    }
   
    try {
        // const response = await axios.get(`${base_url}/s3Url`);
        const response = await axios.get(`${base_url}/s3Url`)
        if(response){

            const url = response.data.url;
            // make a put request s3 using url with content type
          const result = await axios.put(url, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

           if(result.data){
            toast({
                title: 'Image uploaded successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
              }
        }
        
    } catch (error: any) {
      toast({
        title: `Error: ${error?.message as string}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
    });
        console.log("error", error)
        
    }
    };


    const handleUpload =  () => {
        const fileInput = document.getElementById('file') as HTMLInputElement;
        fileInput.click();
    };

    

  return (
    <div className="App">
        <Flex 
          mb={2} 
          position={'absolute'}
          right={8}
          top={'50%'}
          >
            <input type="file" id="file" accept="image/jpeg,image/png" style={{ display: 'none' }} onChange={handleFileChange} />
            <label htmlFor="file">
                <IconButton
                    aria-label="Search database"
                    color={'blue.500'}
                    icon={<LuPlus size={30} />}
                    width={'40px'}
                    height={'40px'}
                    variant={'none'}
                    border={'1px solid'}
                    borderColor={'gray.400'}
                    borderRadius={'50%'}
                    bg={'blue.100'}
                    zIndex={99}
                    ml={4}
                    onClick={handleUpload}
                    size="md"
                />
            </label>

            </Flex>
      <Slider {...settings as any}>
        {images.map((img, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
            <img src={img} alt={img} className="slider-image"/>

          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PhotosUploadsDisplay;