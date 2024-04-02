import { Box, Flex, Text } from '@chakra-ui/react';
import HeroPage from "../components/HeroPage";
import { CSVRow } from '../components/Header';
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
const navigate = useNavigate();


  const handleClick = (value: string) => {
     navigate('/layout', { state: { clickedTable: value } });
  }
 



  useEffect(() => {
    if (!searchQuery) {
      setSelectedUser(null);
      return;
    }
  }, [searchQuery]);




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
        <HeroPage selectedUser={selectedUser} setSelectedUser={setSelectedUser} type={type} uploadedData={uploadedData} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Box>
       {selectedUser && type !=="layout" && <Flex justify={'center'}  direction={'column'} mt={6} textTransform={'capitalize'} >
        <Text fontSize="2xl" fontFamily={"Merienda"} textAlign={'center'} fontWeight={'bold'} onClick={() => handleClick(selectedUser.tableName) }>
          {selectedUser.tableName}
        </Text>
        <Text fontSize="md" fontWeight="bold" color={'red'} textAlign={'center'} fontFamily={"Merienda"}>
          {selectedUser.tableZone}
          </Text>
          </Flex>}
       {children}
      </Box>
    </>
  )
};

export default PageLayout;