import { Key } from 'react';
import {
  Box,
  Flex,
  Stack,
  VStack,
  useColorModeValue,
  Text,
  Divider
} from '@chakra-ui/react';

const dataArray = [
  { guestFirstName: 'John', guestLastName: 'Doe', tableName: 'updated', tableZone: 'Zone A' },
  { guestFirstName: 'Jane', guestLastName: 'Doe', tableName: 'Exodus', tableZone: 'Zone B' },
  { guestFirstName: 'Michael', guestLastName: 'Smith', tableName: 'Leviticus', tableZone: 'Zone C' },
  { guestFirstName: 'Emily', guestLastName: 'Johnson', tableName: 'Numbers', tableZone: 'Zone D' },
  { guestFirstName: 'Daniel', guestLastName: 'Brown', tableName: 'Deuteronomy', tableZone: 'Zone 1' },
  { guestFirstName: 'Sarah', guestLastName: 'Miller', tableName: 'Joshua', tableZone: 'Zone 2' },
  { guestFirstName: 'David', guestLastName: 'Davis', tableName: 'Judges', tableZone: 'Zone 3' },
  { guestFirstName: 'Jennifer', guestLastName: 'Wilson', tableName: 'Ruth', tableZone: 'Zone 4' },
  { guestFirstName: 'Christopher', guestLastName: 'Taylor', tableName: '1 Samuel', tableZone: 'Zone A' },
  { guestFirstName: 'Jessica', guestLastName: 'Anderson', tableName: '2 Samuel', tableZone: 'Zone B' },
  { guestFirstName: 'Matthew', guestLastName: 'Thomas', tableName: '1 Kings', tableZone: 'Zone C' },
  { guestFirstName: 'Amanda', guestLastName: 'Jackson', tableName: '2 Kings', tableZone: 'Zone D' },
  { guestFirstName: 'Ashley', guestLastName: 'White', tableName: 'Isaiah', tableZone: 'Zone 1' },
  { guestFirstName: 'Joshua', guestLastName: 'Harris', tableName: 'Jeremiah', tableZone: 'Zone 2' },
  { guestFirstName: 'Andrew', guestLastName: 'Martin', tableName: 'Ezekiel', tableZone: 'Zone 3' },
  { guestFirstName: 'Emily', guestLastName: 'Clark', tableName: 'Daniel', tableZone: 'Zone 4' },
  { guestFirstName: 'James', guestLastName: 'Lewis', tableName: 'Hosea', tableZone: 'Zone A' },
  { guestFirstName: 'Jessica', guestLastName: 'Lee', tableName: 'Joel', tableZone: 'Zone B' },
  { guestFirstName: 'Benjamin', guestLastName: 'Walker', tableName: 'Amos', tableZone: 'Zone C' },
  { guestFirstName: 'Megan', guestLastName: 'Hall', tableName: 'Obadiah', tableZone: 'Zone D' },
  { guestFirstName: 'Emmanuel', guestLastName: 'Test', tableName: 'Kings', tableZone: 'Zone A' },
  { guestFirstName: 'Test', guestLastName: 'guest', tableName: 'Numbers', tableZone: 'Zone B' },
  { guestFirstName: 'Yves', guestLastName: 'hag', tableName: 'wowo', tableZone: 'wowo' }
];




const GuestList = ({guests}: any) => {
  return (
    <Box width={'full'}>
      <VStack
       
        color={'black'}
        overflow="hidden"
        spacing={0}
        width={'full'}
      >
        {dataArray?.map((user: { guestFirstName: string; guestLastName: string; }, index: Key | null | undefined) => (
          <Box key={index} width={'full'}>
            <Flex
              width={'full'}
              justifyContent="space-between"
              alignItems="center"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            >
              <Stack spacing={0} direction="row" alignItems="center" width={'full'}>
                <Flex direction="column" p={2}>
                  <Text
                    color={useColorModeValue('black', 'white')}
                    fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                    dangerouslySetInnerHTML={{ __html: user.guestFirstName + " " + user.guestLastName }}
                  />
                  <Divider my={1}/>
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