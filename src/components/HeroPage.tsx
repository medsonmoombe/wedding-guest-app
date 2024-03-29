// import { Box, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';



// const HeroPage = ({ setSelectedUser, uploadedData, setSearchQuery, searchQuery, setNoResult}: any) => {
//     const [matchingResults, setMatchingResults] = useState<any[]>([]); // [1

//     // Search and find the selected object that includes the search query from the uploaded data
//     const searchUser = (query: string) => {
//         if (!query) {
//             setNoResult(false)
//             return;
//         }
//         // filter users that include the search query
//         const matchingResults = uploadedData.filter((user: any) => {
//             return user.guestFirstName.toLowerCase().includes(query.toLowerCase());
//         });
//         setMatchingResults(matchingResults);
//         const selectedUser = uploadedData.find((user: any) => {
//             return user.guestFirstName.toLowerCase().includes(query.toLowerCase());
//         });

//         if(!selectedUser){
//             setNoResult(true)
//         }else{
//             setNoResult(false)
//         }
//         setSelectedUser(selectedUser);
//     };

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(event.target.value);
//     };

//     const handleSearch = () => {
//         searchUser(searchQuery);
//     };

//     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             searchUser(searchQuery);
//         }
//     };


//     return (
//         <Box width="full" mt={8}>
//             <Flex align="center" width="full" px={4}>
//                 <InputGroup>
//                     <Input
//                         bg="white"
//                         fontWeight="bold"
//                         textTransform="capitalize"
//                         color="gray.600"
//                         border="1px solid"
//                         borderColor="gray.400"
//                         placeholder="Search"
//                         value={searchQuery}
//                         onChange={handleInputChange}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <InputRightElement onClick={handleSearch} cursor="pointer">
//                         <FaSearch color="gray.400" />
//                     </InputRightElement>
//                 </InputGroup>
//             </Flex>
            
//         </Box>
//     );
// };

// export default HeroPage;

import { Box, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const HeroPage = ({ setSelectedUser, uploadedData, setSearchQuery, searchQuery, setNoResult }: any) => {
    const [matchingResults, setMatchingResults] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
        setMatchingResults(uploadedData);
    };

    const searchUser = (query: string) => {
        if (!query) {
            setNoResult(false);
            return;
        }

        const matchingResults = uploadedData.filter((user: any) => {
                return user.guestFirstName.toLowerCase().includes(query.toLowerCase()) || user.guestLastName && user.guestLastName.toLowerCase().includes(query.toLowerCase());
        });
        setMatchingResults(matchingResults);

        const selectedUser = matchingResults.find((user: any) => {
            return user.guestFirstName.toLowerCase().includes(query.toLowerCase()) || user.guestLastName && user.guestLastName.toLowerCase().includes(query.toLowerCase());
        });

        if (!selectedUser) {
            setNoResult(true);
        } else {
            setNoResult(false);
        }
        setSelectedUser(selectedUser);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        searchUser(query);
    };

    const handleSearch = () => {
        searchUser(searchQuery);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchUser(searchQuery);
        }
    };

    const handleNameClick = (name: any) => {
        const selectedUser = uploadedData.find((user: any) => {
            const useFullNames = user.guestFirstName + ' ' + user.guestLastName;
            setSearchQuery(useFullNames);
            return useFullNames === (name.guestFirstName + ' ' + name.guestLastName);
        });

        setSelectedUser(selectedUser);
        setMatchingResults([]);

        if (!selectedUser) {
            setNoResult(true);
        } else {
            setNoResult(false);
        }
    };


    return (
        <Box width="full" mt={8}>
            <Flex align="center" width="full" px={4}>
                <InputGroup>
                    <Input
                        bg="white"
                        fontWeight="bold"
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
                    <InputRightElement onClick={handleSearch} cursor="pointer">
                        <FaSearch color="gray.400" />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            {isFocused && searchQuery && matchingResults.length > 0 && (
                <Box  maxHeight="150px" mt={1} overflowY="auto" px={4} borderRadius={'5px'}>
                    {matchingResults.map((result, index) => (
                        <Box key={index} onClick={() => handleNameClick(result)} cursor="pointer" py={1} px={4} bg={'white'}  borderBottom="1px solid" borderColor="gray.300">
                            <Text color="gray.600" fontWeight="bold">
                            {result.guestFirstName} {result.guestLastName}
                            </Text>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default HeroPage;
