import { Box } from '@chakra-ui/react';
import CardCarousel from '../components/carousel/index';
import Logo from '../components/ImageLogo';





const HomePage = () => {


  return (
    <>
        <Box mt={4} mb={8}>
        <Logo/>
        <CardCarousel/>
       
        </Box>
    </>
  )
};

export default HomePage;