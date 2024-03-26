import { Box, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';



const HeroPage = ({ setSelectedUser, uploadedData, setSearchQuery, searchQuery, setNoResult}: any) => {

    // Search and find the selected object that includes the search query from the uploaded data
    const searchUser = (query: string) => {
        if (!query) {
            setNoResult(false)
            return;
        }
        const selectedUser = uploadedData.find((user: any) => {
            return user.guestFirstName.toLowerCase().includes(query.toLowerCase());
        });

        if(!selectedUser){
            setNoResult(true)
        }else{
            setNoResult(false)
        }
        setSelectedUser(selectedUser);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        searchUser(searchQuery);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchUser(searchQuery);
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
                        onKeyPress={handleKeyPress}
                    />
                    <InputRightElement onClick={handleSearch} cursor="pointer">
                        <FaSearch color="gray.400" />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    );
};

export default HeroPage;