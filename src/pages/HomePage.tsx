import { Box, Text } from '@chakra-ui/react';
import HeroPage from "../components/HeroPage";
import { CSVRow } from '../components/Header';
import { useEffect, useState } from 'react';

interface CardProps {
    selectedUser: any;
    searchQuery:string;
    noResult: boolean;
}

const CustomCard = ({selectedUser, searchQuery, noResult}: CardProps) => {

  return (
    <>
{selectedUser && <Box
      width="full"
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}
      flexDirection={'column'}
      height="150px"
      mb={8}
      borderWidth={selectedUser ? "3px" : searchQuery ? "3px": 0}
      borderColor={selectedUser && searchQuery ? "red" : searchQuery ? "red": 'transparent'}
      bg={ selectedUser && searchQuery ?  "rgba(128, 128, 128, 0.5)" : searchQuery ? "rgba(128, 128, 128, 0.5)" :  "transparent"}
      borderRadius={ selectedUser && searchQuery ? "15px" : searchQuery ? "15px" : 0} // Rounded corners
    >
     {selectedUser  ? <><Text fontSize="5xl" mb={4}>{selectedUser.tableName}</Text><Text fontSize="4xl" fontWeight="bold" color={'red'}>{selectedUser.tableZone}</Text></> : searchQuery && !selectedUser ? <Text fontSize="xl" color={'black'} mb={4} fontWeight={'bold'} pt={12}>No Result found</Text>: null }
    </Box>}

  {noResult && <Box
      width="full"
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}
      flexDirection={'column'}
      height="150px"
      borderWidth={selectedUser ? "3px" : searchQuery ? "3px": 0}
      borderColor={selectedUser && searchQuery ? "red" : searchQuery ? "red": 'transparent'}
      bg={ selectedUser && searchQuery ?  "rgba(128, 128, 128, 0.5)" : searchQuery ? "rgba(128, 128, 128, 0.5)" :  "transparent"}
      borderRadius={ selectedUser && searchQuery ? "15px" : searchQuery ? "15px" : 0} // Rounded corners
    >
      <Text fontSize="xl" color={'black'} mb={4} fontWeight={'bold'} pt={12}>No Result found</Text>
    </Box>}

    </>
  );
}

interface HomePageProps {
    uploadedData: CSVRow[];
}

const HomePage = ({uploadedData}: HomePageProps) => {
   const [selectedUser, setSelectedUser] = useState<any>(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [noResult, setNoResult] = useState(false);

//    console.log("SELECTED USER ::", selectedUser)

useEffect(() => {
    if(!searchQuery){
        setSelectedUser(null);
        setNoResult(false);
        return;
    }
}, [searchQuery])

    return (
       <Box
        width={'full'}
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        flexDirection={'column'}
        objectFit={'cover'}
        height={'80vh'}
        bgImg={'url(https://images.unsplash.com/photo-1528114805597-d505607e46c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}
        >
            <HeroPage setSelectedUser={setSelectedUser} uploadedData={uploadedData} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setNoResult={setNoResult}/>
            <Box px={4} width={'full'} mt={100} display={'flex'} justifyContent={'end'}  alignItems={'center'}>
             <CustomCard selectedUser={selectedUser} searchQuery={searchQuery} noResult={noResult}/>
            </Box>
        </Box>
    )
};

export default HomePage;