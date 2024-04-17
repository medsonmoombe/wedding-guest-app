import React, { useState } from 'react';
import menuList from '../../assets/svg/menu-compressed.svg';
// import svg from '../../assets/svg/pt-compressed.svg';
import { Box, Image, Spinner } from '@chakra-ui/react';
import ToggleBox from '../planning/Toggle';

const MenuList: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPortugal, setIsPortugal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status

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
    <Box width={'full'} pos={'relative'}>
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
      {isLoading && (
        <Box position="fixed" top="100" left="50%" transform="translate(-50%, -50%)">
          <Spinner size="lg" />
        </Box>
      )}

    {isPortugal ? (
        <Image
          src={menuList}
          alt="Menu"
          width={'100%'}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      ) : (
        <Image
          src={menuList}
          alt="Menu"
          width={'100%'}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
      {/* <Image src={menuList} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} /> */}
    </Box>
  );
};

export default MenuList;
