import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { displayImagesAtom } from "../recoil/atom";

const Logo = () => {

  const fetchedImages = useRecoilValue(displayImagesAtom);

  const photos = fetchedImages.filter((url: string) => {
   return url.endsWith('love.png');
 });

 if(photos.length === 0) {
   return null;
 }

    return (
        <Center mt={2}>
        <Flex style={{ padding: 0 }} direction={'column'} >
          <Center>
            <Image src={photos[0]} alt='love_icon' width={'100px'} height={'50px'} style={{ filter: 'brightness(0%)' }} />
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
    )
    };
export default Logo;