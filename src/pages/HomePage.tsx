import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import CardCarousel from '../components/carousel/index';
import loveIcon from '../assets/images/love.png'




const HomePage = () => {


  return (
    <>
        <Box mt={4} mb={8}>
        <Center mt={2}>
        <Flex style={{ padding: 0 }} direction={'column'} >
          <Center>
            <Image src={loveIcon} alt='love_icon' width={'100px'} height={'50px'} style={{ filter: 'brightness(0%)' }} />
          </Center>
          <Text color="gray.600" style={{ padding: 0 }} fontSize="3xl" fontWeight="bold" fontFamily={"Great Vibes, cursive"}>
            {' '}
            Judith & Robert{' '}
          </Text>{' '}
          <Text color={'gray.500'} fontFamily={''} textAlign={'center'} mb={2}>
            {' '}
            05/05/2024
          </Text>{' '}
        </Flex>
      </Center>
        <CardCarousel/>
       
        </Box>
    </>
  )
};

export default HomePage;