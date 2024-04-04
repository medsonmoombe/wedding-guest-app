import { Box, Flex, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaSearch, FaUsers } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';


const HeroPage = ({ setSelectedUser, uploadedData, setSearchQuery, searchQuery, setNoResult, type }: any) => {
    const [matchingResults, setMatchingResults] = useState<any[]>([]);
    // const [isFocused, setIsFocused] = useState(false);
    const [isNameClicked, setIsNameClicked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputFocus = () => {
        // setIsFocused(true);
        setMatchingResults(uploadedData);
    };

    const searchUser = () => {
        setIsNameClicked(false);
        if (!searchQuery) {
            setNoResult(false);
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
                return (`${user.guestFirstName} ${user.guestLastName}`).toLowerCase().includes(searchQuery.toLowerCase()) || user.guestLastName && user.guestLastName.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setMatchingResults(matchingResults);
    
            const selectedUserObj = matchingResults?.find((user: any) => {
                return (`${user.guestFirstName} ${user.guestLastName}`).toLowerCase().includes(searchQuery.toLowerCase()) || user.guestLastName && user.guestLastName.toLowerCase().includes(searchQuery.toLowerCase());
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
        if (type === "users") {
            const selectedUserObj = uploadedData?.find((user: any) => {
                const useFullNames = user.guestFirstName + ' ' + user.guestLastName;
                setSearchQuery(useFullNames);
                return useFullNames === (name.guestFirstName + ' ' + name.guestLastName);
            });
            setSelectedUser(selectedUserObj);
            setMatchingResults([]);

        } else {
            if (type === "layout") {
                setSearchQuery(name.tableName);
            }
            const selectedUserObj = uploadedData?.find((user: any) => {
                const useFullNames = user.tableName;
                setSearchQuery(useFullNames);
                return useFullNames === (name.tableName);
            });
            setSelectedUser(selectedUserObj);
            setMatchingResults([]);

            if (!selectedUserObj) {
                setNoResult(true);
            } else {
                setNoResult(false);
            }

        }

    };

    const handleRelocate = () => {
        // Check if current URL includes "/layout"
        if (location.pathname.includes("/layout")) {
            // If current URL includes "/layout", navigate to "/"
            navigate("/");
        } else {
            // Otherwise, navigate to "/layout"
            navigate("/layout");
        }
    }


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
                        onKeyPress={handleKeyPress}
                    />
                    <InputRightElement cursor="pointer" gap={2} pr={8} alignItems={'center'}>
                        <Icon as={FaSearch} color="gray.400" boxSize={18} onClick={handleSearch} zIndex={99} />
                        <Icon as={type === "users" ? CiLocationOn : FaUsers} color="gray.400" boxSize={25} mt={-1}
                            onClick={handleRelocate}
                            zIndex={99}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            {searchQuery && matchingResults && matchingResults.length > 0 ? (
                <Box maxHeight="150px" mt={1} overflowY="auto" px={4} width={'full'} borderRadius={'10px'} position={'absolute'} zIndex={20}>
                    {matchingResults?.map((result, index) => (
                        <Box key={index} onClick={() => handleNameClick(result)} cursor="pointer" py={1} px={4} bg={'white'} borderBottom="1px solid" borderColor="gray.300">
                            <Text color="gray.600" fontWeight="bold">
                                {type === "users" ? result.guestFirstName + ' ' + result.guestLastName : result.tableName}
                            </Text>
                        </Box>
                    ))}
                </Box>
            ): null}
        </Box>
    );
};

export default HeroPage;
