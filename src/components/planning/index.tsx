import React, { useState } from 'react';
import timeline from '../../assets/images/newEngPlanning.svg';
import pt_timeline from '../../assets/images/newPtPlanning.svg';
import { Box, Image, Spinner } from '@chakra-ui/react';
import ToggleBox from './Toggle';

const TimeLine: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPortugal, setIsPortugal] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box width={'full'} position={'relative'} >
        <Box display={'flex'} justifyContent={'flex-end'} width={'100%'} pr={5} position={'absolute'} top={10} >
         <ToggleBox setIsPortugal={setIsPortugal} isPortugal={isPortugal}  />
        </Box>
      {!imageLoaded && (
        <Box position="fixed" top="50" left="50%" transform="translate(-50%, -50%)">
          <Spinner size="lg" />
        </Box>
      )}
      { isPortugal ? <Image src={timeline} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} />: 
      <Image src={pt_timeline} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} />
      }
    </Box>
  );
};

export default TimeLine;