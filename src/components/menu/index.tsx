import React from 'react';
import menuList from '../../assets/images/menu.svg';
import { Box, Image } from '@chakra-ui/react';

const MenuList: React.FC = () => {
  return (
    <Box width={'full'}>
      <Image src={menuList} alt="Menu" width={'inherit'} />
    </Box>
    
  );
};

export default MenuList;