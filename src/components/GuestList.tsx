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
                <Flex p={1} fontWeight={'bold'} my={1}>
                  <Avatar size="xs" name={user.guestFirstName + " " + user.guestLastName } src={''} />
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