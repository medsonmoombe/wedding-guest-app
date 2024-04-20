import { useEffect, useState } from "react";
import Layout from "./Layout";
import HomePage from "./HomePage";
import PageLayout from "../components/PageLayout";
import MenuListPage from "../components/menu";
import { Box, Button, Center, Icon, IconButton } from "@chakra-ui/react";
import Timeline from "../components/planning";
import FooterTabs from "../components/tabs";
import PhotosUploadsDisplay from "../components/uploads";
import FileUploads from "./FileUploads";
import { FaArrowDown } from "react-icons/fa";

interface HomeDisplayProps {
    uploadedData: any;
    isFetchingImages: boolean;
    handleAddToHomeScreen: () => void;
    isAppInstalled: boolean;
}

const HomeDisplay = ({ uploadedData, isFetchingImages, handleAddToHomeScreen, isAppInstalled}: HomeDisplayProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [clickedTabel, setClickedTable] = useState<string>("");


    // if searchQuery is empty setClickedTable to empty string
    useEffect(() => {
        if (!searchQuery) {
            setClickedTable("");
        }
    }, [searchQuery]);

    return (
        <Box pos="relative" height={'auto'} bg={'gray.100'} mb={4}>
           {!isAppInstalled && activeTabIndex === 0 &&
           <IconButton
                position="fixed"
                top={4}
                left={4}
                zIndex={999}
                onClick={handleAddToHomeScreen}
                aria-label="Add to home screen"
                icon={<Icon as={FaArrowDown} />}
                bg={'green.400'}
                color={'white'}
                variant="solid"
            />}
            <PageLayout
                uploadedData={uploadedData}
                type={activeTabIndex === 1 ? 'users': ''}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setActiveTabIndex={setActiveTabIndex}
                activeTabIndex={activeTabIndex}
                setClickedTable={setClickedTable}
            >
                {/* render the component here based on the activeTabIndex */}
                {activeTabIndex === 0 && <HomePage/>}
                {activeTabIndex === 0 && <PhotosUploadsDisplay  isFetchingImages={isFetchingImages}/> }
                {activeTabIndex === 1 && <Layout selectedUser={selectedUser} setClickedTable={setClickedTable} searchQuery={searchQuery} setSearchQuery={setSearchQuery} uploadedData={uploadedData} clickedTabel={clickedTabel} activeTabIndex={activeTabIndex} />}
                {activeTabIndex === 2 && <MenuListPage />}
                {activeTabIndex === 3 && <Timeline />}
                {activeTabIndex === 4 && <FileUploads/> }
            </PageLayout>
            <Box width="full" position="fixed" bottom={0} >
                <Center>
                    <FooterTabs
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                    />
                </Center>
            </Box>
        </Box>
    );
};
export default HomeDisplay;