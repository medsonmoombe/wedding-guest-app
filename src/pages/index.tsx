import { useEffect, useState } from "react";
import Layout from "./Layout";
import HomePage from "./HomePage";
import PageLayout from "../components/PageLayout";
import MenuListPage from "../components/menu";
import { Box, Center } from "@chakra-ui/react";
import Timeline from "../components/planning";
import FooterTabs from "../components/tabs";
import PhotosUploadsDisplay from "../components/uploads";

interface HomeDisplayProps {
    uploadedData: any;
    photos: any;
    isFetchingImages: boolean;
}

const HomeDisplay = ({ uploadedData, photos, isFetchingImages}: HomeDisplayProps) => {
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
        <Box pos="relative">
            <PageLayout
                uploadedData={uploadedData}
                type={activeTabIndex === 0 ? 'users' : 'layout'}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setActiveTabIndex={setActiveTabIndex}
                activeTabIndex={activeTabIndex}
                setClickedTable={setClickedTable}
            >
                {/* render the component here based on the activeTabIndex */}
                {activeTabIndex === 0 && <HomePage photos={photos} />}
                {activeTabIndex === 0 && <PhotosUploadsDisplay photos={photos} isFetchingImages={isFetchingImages}/> }
                {activeTabIndex === 1 && <Layout setClickedTable={setClickedTable} setSearchQuery={setSearchQuery} uploadedData={uploadedData} clickedTabel={clickedTabel} activeTabIndex={activeTabIndex} />}
                {activeTabIndex === 2 && <MenuListPage />}
                {activeTabIndex === 3 && <Timeline />}
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