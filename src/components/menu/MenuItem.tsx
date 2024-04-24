import React from 'react';
import { Box, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import Logo from '../ImageLogo';
; 

interface MenuItem {
  ID: string;
  Description: string;
  Font: string;
}

const MenuList: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
  return (
    <VStack spacing={4}  px={5} pt={4} bg={'gray.100'} width={'100%'} pb={'100px'}>
      {menuItems.map((menuItem) => (
        <Box key={menuItem.ID} fontFamily={menuItem.Font} width={'100%'}>
         {/* if description is equal to "Menu" then display it differently */}
            {menuItem.Description.toLowerCase() === 'menu' ? (
                <Text fontSize='90px' mt={16} textAlign={'center'}>
                {menuItem.Description}
                </Text>
            ) : 
            (menuItem.Description.toLowerCase() === 'saladas' || menuItem.Description.toLowerCase() === 'quentes') || menuItem.Description.toLowerCase() === 'pratos tradicionais' || menuItem.Description.toLowerCase() === 'guarnicoes'  ? (
                <Flex justifyContent={'space-between'} width={'100%'}  direction={'column'}>
                  
                <Text fontSize={'20px'} textAlign={'left'}>{menuItem.Description}</Text>
                <Divider w={'100%'} borderColor={'black'}/>
                </Flex>
            ) : (menuItem.Description.toLowerCase() === 'sobremesas' || menuItem.Description.toLowerCase() === 'entradas') || (menuItem.Description.toLowerCase() === 'buffet') ? (

                <Text fontSize={'35px'} pt={(menuItem.Description.toLowerCase() === 'buffet' || menuItem.Description.toLowerCase() === 'sobremesas')  ? 12 : 0} textAlign={'center'}>{menuItem.Description}</Text>
            ) :
            
            (
                <Text fontSize={'20px'} textAlign={'center'}>{menuItem.Description}</Text>
            )}
        </Box>
      ))}
      <Logo />
    </VStack>
  );
};

export default MenuList;
