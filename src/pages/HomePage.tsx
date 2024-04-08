import { Box, Center, Flex, Text } from '@chakra-ui/react';
import CardCarousel from '../components/carousel/index';


const HomePage = () => {

  return (
    <>
        <Box pos={'fixed'} width={'full'} top={'160px'}>
        <CardCarousel />
        <Center mt={'15px'}>
        <Flex style={{ padding: 0 }} direction={'column'} >
          <Text color="gray.600" style={{ padding: 0 }} fontSize="2xl" fontWeight="bold" fontFamily={"Galada, cursive"}>
            {' '}
            Judith & Robert{' '}
          </Text>{' '}
          <Text color={'gray.500'} fontFamily={''} textAlign={'center'}>
            {' '}
            05/05/2024
          </Text>{' '}
        </Flex>
      </Center>
        </Box>
    </>
  )
};

export default HomePage;