import { Box, Center, Flex, Text } from '@chakra-ui/react';
import HeroPage from "../components/HeroPage";
import { CSVRow } from '../components/Header';
import { useEffect, useState } from 'react';
import img1 from '../assets/images/img-1.jpg';
import img2 from '../assets/images/img-2.jpg';
import img3 from '../assets/images/img-3.jpg';

interface Props {
  uploadedData: CSVRow[];
    children: React.ReactNode;
    setSearchQuery: (value: string) => void;
    searchQuery: string;
    setSelectedUser: (value: any) => void;
    selectedUser: any;
    type: string;
}

const PageLayout = ({ uploadedData, children, searchQuery,type, setSearchQuery, selectedUser, setSelectedUser }: Props) => {
  const [noResult, setNoResult] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const backgrounds = [
    img1,
    img2,
    img3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change the background every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSelectedUser(null);
      setNoResult(false);
      return;
    }
  }, [searchQuery])

  return (
    <>
      <Box
        width={'full'}
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        flexDirection={'column'}
        objectFit={'contain'}
        minHeight={'80vh'}
        height={'100vh'}
        // bgImg={`url(${backgrounds[bgIndex]})`}
        bg={'gray.100'}
        objectPosition={'center'}
        style={{ backgroundSize: 'cover' }}

      >
        <Box width={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}  mb={8}>
        <HeroPage selectedUser={selectedUser} setSelectedUser={setSelectedUser} type={type} uploadedData={uploadedData} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setNoResult={setNoResult} />
        </Box>
       {selectedUser && type !=="layout" && <Flex justify={'center'} direction={'column'} mt={2} textTransform={'capitalize'} >
        <Text fontSize="5xl" textAlign={'center'}>
          {selectedUser.tableName}
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color={'red'} textAlign={'center'}>
          {selectedUser.tableZone}
          </Text>
          </Flex>}
       {children}
      </Box>
    </>
  )
};

export default PageLayout;