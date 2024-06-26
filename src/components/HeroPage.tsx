import { Box,Collapse, Divider, Flex, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from "react-icons/md";



interface Props {
    matchingResults: any[];
    type: string;
    onFocus: boolean;
    handleNameClick: (name: any) => void;

}

function CollapseEx({ matchingResults, handleNameClick, type, onFocus }: Props ) {
    // Initialize toggle state based on whether there are matching results
    const [toggle, setToggle] = useState(matchingResults.length > 0);
  
    const handleToggle = () => {
      if(matchingResults.length > 0){
          setToggle(onFocus);
      }
    };

    useEffect(() => {
        handleToggle();
    }, [onFocus]);
  
    return (
      <>
        <Collapse in={toggle} animateOpacity>
          <Box bg={'white'} maxHeight="200px" overflowY="auto" mt={1} px={4} width={'inherit'} borderRadius={'10px'} zIndex={99}>
                    {matchingResults?.map((result, index) => (
                        <Box key={index} onClick={() => handleNameClick(result)} cursor="pointer" py={1} px={4}>

                            <Text color="gray.600" fontWeight="bold">
                                {type === "users" ? result.guestFirstName + ' ' + (result.guestLastName ? result.guestLastName : '') : result.tableName}
                            </Text>
                            <Divider  my={1}/>
                        </Box>
                    ))}
                </Box>
        </Collapse>
      </>
    );
  }

  interface HeroPageProps {
    setSelectedUser: (value: any) => void;
    onFocus: boolean;
    setOnFocus: (value: boolean) => void;
    uploadedData: any[];
    setSearchQuery: (value: string) => void;
    searchQuery: string;
    setNoResult?: (value: boolean) => void;
    type: string;
    selectedUser: any;
    activeTabIndex: number;
    setActiveTabIndex: (value: number) => void;
}


const HeroPage = ({ setSelectedUser,onFocus, setOnFocus, uploadedData, setSearchQuery, searchQuery, setNoResult, type }: HeroPageProps) => {
    const [matchingResults, setMatchingResults] = useState<any[]>([]);
    // const [isFocused, setIsFocused] = useState(false);
    const [isNameClicked, setIsNameClicked] = useState(false);


    const handleInputBlur = () => {
        setOnFocus(false);
    };

    const handleInputFocus = () => {
        setOnFocus(true);
        setMatchingResults(uploadedData);
    };

    const searchUser = () => {
        setIsNameClicked(false);
        if (!searchQuery) {
            setNoResult?.(false);
            return;
        }

        if(type === "layout"){
            const matchingResults = uploadedData?.filter((user: any) => {
                return user?.tableName?.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setMatchingResults(matchingResults);
    
            const selectedUserObj = matchingResults?.find((user: any) => {
                return user.tableName.toLowerCase().includes(searchQuery?.toLowerCase());
            });
            setSelectedUser(selectedUserObj);
        } else {

            const matchingResults = uploadedData?.filter((user: any) => {
                return (`${user.guestFirstName} ${user.guestLastName ? user.guestLastName: ''}`).toLowerCase().includes(searchQuery.toLowerCase()) || user.guestLastName && user.guestLastName.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setMatchingResults(matchingResults);
    
            const selectedUserObj = matchingResults?.find((user: any) => {
                return (`${user.guestFirstName} ${user.guestLastName ? user.guestLastName : ''}`).toLowerCase().includes(searchQuery.toLowerCase()) || user.guestLastName && user.guestLastName.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setSelectedUser(selectedUserObj);
        }


    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
            searchUser();
    };

    const handleSearch = () => {
        if (!searchQuery) {
            return;
        } 
        searchUser();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
                searchUser();
        }
    };

    const handleNameClick = (name: any) => {
        setIsNameClicked(true);

            const selectedUserObj = uploadedData?.find((user: any) => {
                const useFullNames = user.guestFirstName + ' ' + (user.guestLastName ? user.guestLastName: '');
                setSearchQuery(useFullNames);
                return useFullNames === (name.guestFirstName + ' ' +(name.guestLastName ? name.guestLastName: ''));
            });
            setSelectedUser(selectedUserObj);
            setMatchingResults([]);
    };


    useEffect(() => {
        if(searchQuery){
            searchUser();
        } else {
            setMatchingResults([]);
        }
    },[searchQuery]);

    // clear the matching results when the handleNameClick is called
    useEffect(() => {
        if (isNameClicked) {
            setMatchingResults([]);
        }
    }, [isNameClicked]);



    




    return (
        <Box width="full" top={8} pos={'relative'}>
            <Flex align="center" width="full" px={4}>
                <InputGroup>
                    <Input
                        bg="white"
                        fontWeight="normal"
                        textTransform="capitalize"
                        color="gray.600"
                        border="1px solid"
                        borderColor="gray.400"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur} 
                        onKeyPress={handleKeyPress}
                    />
                    <InputRightElement cursor="pointer" gap={2} pr={8} alignItems={'center'}>
                        
                      {
                        searchQuery && searchQuery.length > 0 ? (
                            <Icon as={MdClose} color="gray.400" boxSize={18} onClick={() => setSearchQuery('')} zIndex={99} />
                        ) :<Icon as={FaSearch} color="gray.400" boxSize={18} onClick={handleSearch} zIndex={99} />
                      }
                    </InputRightElement>
                </InputGroup>
            </Flex>
            {searchQuery && matchingResults && matchingResults.length > 0 ? (
                <Box px={4}>
                <CollapseEx onFocus={onFocus}  matchingResults={matchingResults} handleNameClick={handleNameClick} type={type} />
                </Box>
            ) : null}
        </Box>
    );
};

export default HeroPage;
