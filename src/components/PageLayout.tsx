import { Box, Flex } from '@chakra-ui/react';
import HeroPage from "../components/HeroPage";
import { CSVRow } from '../components/Header';
import {  useEffect, useState } from 'react';

interface Props {
  uploadedData: CSVRow[];
    children: React.ReactNode;
    setSearchQuery: (value: string) => void;
    searchQuery: string;
    setSelectedUser: (value: any) => void;
    selectedUser: any;
    setActiveTabIndex: (value: number) => void;
    activeTabIndex: number;
    setClickedTable: (value: string) => void;
    type: string;
}

const PageLayout = ({ uploadedData, children, searchQuery,setActiveTabIndex, activeTabIndex , setSearchQuery, selectedUser, setSelectedUser }: Props) => {
  const [onFocus, setOnFocus] = useState(false);


 



  useEffect(() => {
    if (!searchQuery) {
      setSelectedUser(null);
      return;
    }
  }, [searchQuery]);



  return (
    <Flex flexDirection="column" height={'100vh'} bg="gray.100">
    <Box flexGrow={1} width="full">
      {activeTabIndex === 1  &&  <Box width="full" display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={20}>
           <HeroPage setActiveTabIndex={setActiveTabIndex} activeTabIndex={activeTabIndex} onFocus={onFocus} selectedUser={selectedUser} setOnFocus={setOnFocus} setSelectedUser={setSelectedUser} type={'users'} uploadedData={uploadedData} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Box>}
        {children}
      </Box>
    </Flex>
  );

};

export default PageLayout;