import { Key } from 'react';
import {
  Box,
  Flex,
  Stack,
  VStack,
  useColorModeValue,
  Avatar,
  Text
} from '@chakra-ui/react';



const GuestList = ({guests}: any) => {
  return (
    <Box width={'full'}>
      <VStack
        // boxShadow={useColorModeValue(
        //   '2px 6px 8px rgba(160, 174, 192, 0.6)',
        //   '2px 6px 8px rgba(9, 17, 28, 0.9)'
        // )}
        // bg={useColorModeValue('gray.100', 'gray.800')}
        bg="rgba(200, 230, 255, 0.2)"
        color={'black'}
        overflow="hidden"
        spacing={0}
        width={'full'}
      >
        {guests?.map((user: { guestFirstName: string; guestLastName: string; }, index: Key | null | undefined) => (
          <Box key={index} width={'full'}>
            <Flex
              width={'full'}
              justifyContent="space-between"
              alignItems="center"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            >
              <Stack spacing={0} direction="row" alignItems="center" width={'full'}>
                <Flex p={2} fontWeight={'bold'}>
                  <Avatar size="sm" name={user.guestFirstName + " " + user.guestLastName } src={''} />
                </Flex>
                <Flex direction="column" p={2}>
                  <Text
                    color={useColorModeValue('black', 'white')}
                    fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                    dangerouslySetInnerHTML={{ __html: user.guestFirstName + " " + user.guestLastName }}
                  />
                </Flex>
              </Stack>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default GuestList;