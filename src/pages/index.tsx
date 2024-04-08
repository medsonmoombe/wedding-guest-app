import { useState } from "react";
import Layout from "./Layout";
import HomePage from "./HomePage";
import PageLayout from "../components/PageLayout";
import MenuListPage from "../components/menu";
import { Box } from "@chakra-ui/react";
import Timeline from "../components/planning";

interface HomeDisplayProps {
    uploadedData: any;
}

const HomeDisplay = ({uploadedData}: HomeDisplayProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [clickedTabel, setClickedTable] = useState<string>("");
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
            {activeTabIndex === 0 && <HomePage/>}
            {activeTabIndex === 1 && <Layout setSearchQuery={setSearchQuery} uploadedData={uploadedData} clickedTabel={clickedTabel} searchQuery={searchQuery} activeTabIndex={activeTabIndex} />}
            {activeTabIndex === 2 && <MenuListPage/>}
            {activeTabIndex === 3 && <Timeline/>}
            </PageLayout>
        </Box>
    );
};
export default HomeDisplay;