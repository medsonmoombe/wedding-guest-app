import React from 'react';
import { Box, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import Logo from '../ImageLogo';

interface MenuItem {
  ID: string;
  Description: string;
  Font: string;
}

const MenuList: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {

  return (
    <VStack spacing={4} px={5} pt={4} bg={'gray.100'} width={'100%'} pb={'100px'}>
      {menuItems.map((menuItem) => {
        return (
            <Box key={menuItem.ID} fontFamily={menuItem.Font} width={'100%'}>
                {/* If description is equal to "Menu", display it differently */}
                {menuItem.Description.toLowerCase() === 'menu' ? (
                <Text fontSize='90px' textAlign={'center'}>
                    {menuItem.Description}
                </Text>
                ) :(menuItem.Description.toLowerCase() === 'salads' || menuItem.Description.toLowerCase() === 'hot dishes') || menuItem.Description.toLowerCase() === 'traditional dishes' || menuItem.Description.toLowerCase() === 'side dishes' ? (
                    <Flex justifyContent={'space-between'} width={'100%'} direction={'column'}>
                      <Text fontSize={'20px'} textAlign={'left'}>{menuItem.Description}</Text>
                      <Divider w={'100%'} borderColor={'black'} />
                    </Flex>
                  ): (menuItem.Description.toLowerCase() === 'desserts' || menuItem.Description.toLowerCase() === 'starters') || (menuItem.Description.toLowerCase() === 'buffet') ? (
                <Text fontSize={'35px'} textAlign={'center'}>{menuItem.Description}</Text>
                ) :
                (
                    <Text fontSize={'20px'} textAlign={'center'}>{menuItem.Description}</Text>
                )}
            </Box>
            );
      }
      
      )}
      <Logo />
    </VStack>
  );
};

export default MenuList;
