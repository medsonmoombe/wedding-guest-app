import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { CSVRow } from '../components/Header';
import PageLayout from '../components/PageLayout';
import { useState } from 'react'; 
import CardCarousel from '../components/carousel/index';


interface HomePageProps {
  uploadedData: CSVRow[];
}

const HomePage = ({ uploadedData }: HomePageProps) => {
const [searchQuery, setSearchQuery] = useState('');
const [selectedUser, setSelectedUser] = useState<any>(null);
  return (
    <>
    <PageLayout 
      uploadedData={uploadedData}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      setSelectedUser={setSelectedUser}
      selectedUser={selectedUser}
      type={'users'}
      >
        <Box pos={'fixed'} width={'full'} top={'230px'}>
        <CardCarousel />
        <Center mt={'40px'}>
        <Flex style={{ padding: 0 }} direction={'column'} >
          <Text color="gray.600" style={{ padding: 0 }} fontSize="2xl" fontWeight="bold" fontFamily={"Merienda"}>
            {' '}
            Robert & Judith
          </Text>{' '}
          <Text color={'gray.500'} fontFamily={''} textAlign={'center'}>
            {' '}
            05/05/2024
          </Text>{' '}
        </Flex>
      </Center>
        </Box>
        </PageLayout>

    </>
  )
};

export default HomePage;