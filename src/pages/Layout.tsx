import { Box, Text, Center, Flex, Button } from "@chakra-ui/react";
import PageLayout from "../components/PageLayout";
import {  useEffect, useState } from "react";
import SVGComponent from "../components/LayoutComponent";
import CustomModal from "../components/modal/PopUpModal";
import GuestList from "../components/GuestList";
import { useLocation } from "react-router-dom";

interface LayoutProps {
    uploadedData: any;
}

const Layout = ({uploadedData}: LayoutProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<any[]>([]);

    const location = useLocation();
    let clickedTable = location.state?.clickedTable;
  

    const handleOpen = () => {
        setIsOpen(true);
      }

      const handleClose = () => {
        setIsOpen(false);
        // clear any highligeted table
        const tableElements = document.querySelectorAll('[name]');
        tableElements.forEach(tableElement => {
          tableElement.setAttribute('fill', 'white');
          tableElement.setAttribute('stroke', 'black');
        });
      }


    const highlightTable = (tableName: string) => {
        // Find the SVG element by its name attribute
        const tableElements = document.querySelectorAll('[name]');
        // Loop through each table element to find the matching one
        tableElements.forEach(tableElement => {
          if (tableElement.getAttribute('name')?.toLowerCase() === tableName?.toLowerCase()) {
            // Highlight the table in green
            console.log(`Table ${tableName} found.`)
            tableElement.setAttribute('fill', '#00a86b');
            tableElement.setAttribute('stroke', '#00a86b');
          }
        });
      
        console.log(`Table ${tableName} not found.`);
      }

  
      

    useEffect(() => {
    
      if(searchQuery){
        clickedTable = "";
        const tableElements = document.querySelectorAll('[name]');
        tableElements.forEach(tableElement => {
          // tableElement.setAttribute('fill', 'white');
          // tableElement.setAttribute('stroke', 'black');
          if (tableElement.getAttribute('name')?.toLowerCase() === searchQuery?.toLowerCase()) {
            highlightTable(searchQuery);
          }else {
            tableElement.setAttribute('fill', 'white');
            tableElement.setAttribute('stroke', 'black');
          }
          });
      } 
      
      if(clickedTable && !searchQuery) {
        const tableElements = document.querySelectorAll('[name]');
        tableElements.forEach(tableElement => {
          // tableElement.setAttribute('fill', 'white');
          // tableElement.setAttribute('stroke', 'black');
          if (tableElement.getAttribute('name')?.toLowerCase() === clickedTable?.toLowerCase()) {
            highlightTable(clickedTable);
          }else {
            tableElement.setAttribute('fill', 'white');
            tableElement.setAttribute('stroke', 'black');
          }
          });
      } 
      }, [searchQuery, clickedTable]);


      // onclick of a table, console.log the table name
      useEffect(() => {
        const tableElements = document.querySelectorAll('[name]');
        tableElements.forEach(tableElement => {
          tableElement.addEventListener('click', () => {
          const clickedTableName = tableElement.getAttribute('name');;
            if (tableElement.getAttribute('name')?.toLowerCase() === clickedTableName?.toLowerCase()) {
              highlightTable(clickedTableName as string);
            }else {
              tableElement.setAttribute('fill', 'white');
              tableElement.setAttribute('stroke', 'black');
            }

            setSelectedUser({tableName: tableElement.getAttribute('name')});
            let selectedTableArr: any[] = [];
            
            // find the guests whose table matches the clicked table
            uploadedData?.filter((data: any) => {
              if(data.tableName === tableElement.getAttribute('name')){
                selectedTableArr.push(data);
              }else {
                console.log("data", "no data found");
              }
            });
            setSelectedTable(selectedTableArr);
          handleOpen();
          });
        });
      }, [uploadedData]);

    return (
        <Box>
        <PageLayout 
         uploadedData={uploadedData}
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         selectedUser={selectedUser}
         setSelectedUser={setSelectedUser}
         type={'layout'}
         >

          <Center mb={4} pos={'fixed'} width={'full'} top={'100px'} flexDirection={'column'}>
             <SVGComponent />

             <Flex width={'full'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}  mt={8}>
              <Button bg={'gray.300'} color={'black'} onClick={() => window.location.href = '/'}>back</Button>
              </Flex>
          </Center>
            </PageLayout>
            <Box px={4}>
            <CustomModal isOpen={isOpen} onClose={handleClose}  title={`${selectedUser?.tableName} Table`}>
                <Box width={'full'} display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'}  mb={8} height={ Number(selectedTable?.length) > 3 ? '430px': '200px'} overflowY={'auto'}>
                    <Box width={'full'} display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'}  mb={8}>
                    {(selectedTable && selectedTable.length !== 0) ? <GuestList guests={selectedTable} />: (
                        <Box width={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}  mt={8}>
                            <Text fontSize="md" color={'black'} textAlign={'center'} >No guest found for this table</Text>
                        </Box>
                    
                    )}
                    </Box>
                </Box>
            </CustomModal>
            </Box>
        </Box>
    );
}

export default Layout;