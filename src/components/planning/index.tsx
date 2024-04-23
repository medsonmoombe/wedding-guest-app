// import React, { useState } from 'react';
// import timeline from '../../assets/svg/ENG-compressed.svg';
// import pt_timeline from '../../assets/svg/pt-compressed.svg';
// import { Box, Image, Spinner } from '@chakra-ui/react';
// import ToggleBox from './Toggle';

// const TimeLine: React.FC = () => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isPortugal, setIsPortugal] = useState(false);

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//   };

//   return (
//     <Box width={'full'} position={'relative'} >
//         <Box display={'flex'} justifyContent={'flex-end'} width={'100%'} pr={5} position={'absolute'} top={10} >
//          <ToggleBox setIsPortugal={setIsPortugal} isPortugal={isPortugal}  />
//         </Box>
//       {!imageLoaded && (
//         <Box position="fixed" top="50" left="50%" transform="translate(-50%, -50%)">
//           <Spinner size="lg" />
//         </Box>
//       )}
//       { isPortugal ? <Image src={timeline} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} />: 
//       <Image src={pt_timeline} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} />
//       }
//     </Box>
//   );
// };

// export default TimeLine;


import React, { useState } from 'react';
import timeline from '../../assets/svg/ENG-compressed.svg';
import pt_timeline from '../../assets/svg/pt-compressed.svg';
import { Box, Image, Spinner } from '@chakra-ui/react';
import ToggleBox from './Toggle';
import { useRecoilValue } from 'recoil';
import { displayImagesAtom } from '../../recoil/atom';


const TimeLine: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPortugal, setIsPortugal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status

  const fetchedImages = useRecoilValue(displayImagesAtom);

  const photos = fetchedImages.length > 0 ? fetchedImages?.filter((url: string) => {
    return url.endsWith('ENG-compressed.svg') ||
    url.endsWith('pt-compressed.svg');
 }) : [pt_timeline, timeline];

 console.log("SVGS ::", photos)

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false); // Set loading to false when image is loaded
  };

  const toggleLanguage = () => {
    setIsLoading(true); // Set loading to true when language is toggled
    setImageLoaded(false); // Reset imageLoaded state
    setIsPortugal((prevIsPortugal: boolean) => !prevIsPortugal);
  };

  return (
    <Box width={'full'} position={'relative'}>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        width={'100%'}
        pr={5}
        position={'absolute'}
        top={10}
      >
        <ToggleBox setIsPortugal={toggleLanguage} isPortugal={isPortugal} />
      </Box>
      {isLoading && ( // Show spinner if loading is true
        <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Spinner size="lg" />
        </Box>
      )}
      {isPortugal ? (
        <Image
          src={photos?.[1]}
          alt="Menu"
          width={'100%'}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      ) : (
        <Image
          src={photos?.[0]}
          alt="Menu"
          width={'100%'}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
    </Box>
  );
};

export default TimeLine;
