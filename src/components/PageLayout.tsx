import { Box, Center, Flex, Text } from '@chakra-ui/react';
import HeroPage from "../components/HeroPage";
import { CSVRow } from '../components/Header';
import {  useEffect, useState } from 'react';
import FooterTabs from './tabs';

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

const PageLayout = ({ uploadedData, setClickedTable, children, searchQuery,setActiveTabIndex, activeTabIndex ,type, setSearchQuery, selectedUser, setSelectedUser }: Props) => {
  const [onFocus, setOnFocus] = useState(false);


  const handleClick = (value: string) => {
     // set the active tab index to 1 and pass the clicked table name to the layout page
     if(value){
      setActiveTabIndex(1);
    setClickedTable(value);
    setSearchQuery("");
      }else {
  setClickedTable("");
}
  }
 



  useEffect(() => {
    if (!searchQuery) {
      setSelectedUser(null);
      return;
    }
  }, [searchQuery]);



  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box flexGrow={1} width="full" bg="gray.100">
        <Box width="full" display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={8}>
          {(activeTabIndex === 0 || activeTabIndex === 1) && <HeroPage setActiveTabIndex={setActiveTabIndex} activeTabIndex={activeTabIndex} onFocus={onFocus} selectedUser={selectedUser} setOnFocus={setOnFocus} setSelectedUser={setSelectedUser} type={type} uploadedData={uploadedData} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        </Box>
        {selectedUser && type !== "layout" && !onFocus && (
          <Flex justify="center" direction="column" mt={14} textTransform="capitalize">
            <Text fontSize="2xl" fontFamily="Montserrat Alternates" textAlign="center" fontWeight="bold" onClick={() => handleClick(selectedUser.tableName)}>
              {selectedUser.tableName}
            </Text>
            <Text fontSize="md" fontWeight="bold" color="red" textAlign="center" fontFamily="Montserrat Alternates">
              {selectedUser.tableId}
            </Text>
          </Flex>
        )}
        {children}
      </Box>
    </Flex>
  );

};

export default PageLayout;