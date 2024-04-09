import { Box,Collapse, Divider, Flex, Icon, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaSearch, FaUsers } from 'react-icons/fa';
import { LuPlus } from "react-icons/lu";


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
          <Box bg={'white'} maxHeight="100px" overflowY="auto" mt={1} px={4} width={'inherit'} borderRadius={'10px'} zIndex={99}>
                    {matchingResults?.map((result, index) => (
                        <Box key={index} onClick={() => handleNameClick(result)} cursor="pointer" py={1} px={4}>

                            <Text color="gray.600" fontWeight="bold">
                                {type === "users" ? result.guestFirstName + ' ' + result.guestLastName : result.tableName}
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


const HeroPage = ({setActiveTabIndex, activeTabIndex, setSelectedUser,onFocus, setOnFocus, uploadedData, setSearchQuery, searchQuery, setNoResult, type }: HeroPageProps) => {
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
                setNoResult?.(true);
            } else {
                setNoResult?.(false);
            }

        }

    };

    const handleRelocate = () => {
        // Check if current URL includes "/layout"
        if (activeTabIndex === 1) {
            // If current URL includes "/layout", navigate to "/"
            setSearchQuery("");
            setActiveTabIndex(0);
        } else {
            // Otherwise, navigate to "/layout"
            setActiveTabIndex(1);
            setSearchQuery("");
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



    
const handleUpload =  () => {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.click();
};

const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file as Blob);
    if (!file) {
        return;
    }
   
    try {
        const response = await axios.get(`http://localhost:3000/s3Url`);
        if(response){

            const url = response.data.url;
            // make a put request s3 using url with content type
          const result = await axios.put(url, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const imageUrl = url.split('?')[0];

            console.log("IMAGE URL", imageUrl);

            // render the uploaded image
           const image = document.createElement('img');
              image.src = imageUrl;
                image.style.width = '100px';
                image.style.height = '100px';
                image.style.borderRadius = '50%';
                image.style.margin = '0 auto';
                image.style.display = 'block';

                document.body.appendChild(image);

        }
        
    } catch (error) {
        console.log("error", error)
        
    }
    };

    

    return (
        <Box width="full" top={8} pos={'relative'}>
            <Flex mb={2}>
           {/* create an upload file for images  */}
           {/* accept all jpg and png files */}
            <input type="file" id="file" accept="image/jpeg,image/png" style={{ display: 'none' }} onChange={handleFileChange} />
            <label htmlFor="file">
                <IconButton
                    aria-label="Search database"
                    color={'gray.500'}
                    icon={<LuPlus size={30} />}
                    width={'40px'}
                    height={'40px'}
                    variant={'none'}
                    onClick={handleUpload}
                    size="md"
                />
            </label>

            </Flex>
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
                        <Icon as={FaSearch} color="gray.400" boxSize={18} onClick={handleSearch} zIndex={99} />
                        <Icon as={type === "users" ? CiLocationOn : FaUsers} color="gray.400" boxSize={25} mt={-1}
                            onClick={handleRelocate}
                            zIndex={99}
                        />
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
