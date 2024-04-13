import React, { useState } from 'react';
import menuList from '../../assets/images/menuFile.svg';
import { Box, Image, Spinner } from '@chakra-ui/react';

const MenuList: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box width={'full'} >
      {!imageLoaded && (
        <Box position="fixed" top="50" left="50%" transform="translate(-50%, -50%)">
          <Spinner size="lg" />
        </Box>
      )}
      <Image src={menuList} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} />
    </Box>
  );
};

export default MenuList;
