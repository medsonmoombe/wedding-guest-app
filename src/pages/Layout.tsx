import { Box, Text, Center, Flex, IconButton } from "@chakra-ui/react";
import PageLayout from "../components/PageLayout";
import {  useEffect, useState } from "react";
import SVGComponent from "../components/LayoutComponent";
import CustomModal from "../components/modal/PopUpModal";
import GuestList from "../components/GuestList";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import tables from "../tables/tables.json";
import { isValidTableId } from "../components/function";

interface LayoutProps {
    uploadedData: any;
}

const Layout = ({uploadedData}: LayoutProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<any[]>([]);
    const [openTable, setOpenTable] = useState<any>(null);
    const navigate = useNavigate();

    const location = useLocation();
    let clickedTable = location.state?.clickedTable;

  

    const handleOpen = () => {
        setIsOpen(true);
      }

      const handleClose = () => {
        setIsOpen(false);
       // Reset styles of tables with valid IDs
  const tableElements = document.querySelectorAll('[id]');
  tableElements.forEach(tableElement => {
    const tableId = tableElement.getAttribute('id');
    if (isValidTableId(tableId as string)) {
      tableElement.setAttribute('fill', 'white');
      tableElement.setAttribute('stroke', 'black');
    }
  });
      }


    const highlightTable = (tableName: string) => {
        // Find the SVG element by its name attribute
        const tableElements = document.querySelectorAll('[id]');
        const table = tables.find((table) => table.tableName.toLowerCase() === tableName?.toLowerCase());
        // Loop through each table element to find the matching one
        tableElements.forEach(tableElement => {
          if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
            tableElement.setAttribute('fill', '#00a86b');
            tableElement.setAttribute('stroke', '#00a86b');
          }
        });
    
      }

  
      

    useEffect(() => {
    
      if(searchQuery){
        clickedTable = "";
        const tableElements = document.querySelectorAll('[id]');
        const table = tables.find((table) => table.tableName.toLowerCase() === searchQuery?.toLowerCase()); 
        tableElements.forEach(tableElement => {
          if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
            highlightTable(searchQuery);
          }else {
            // reset the styles of the tables with valid IDs
            const tableId = tableElement.getAttribute('id');
            if (isValidTableId(tableId as string)) {
              tableElement.setAttribute('fill', 'white');
              tableElement.setAttribute('stroke', 'black');
            }
          }
          });
      } 
      ""
      if(clickedTable && !searchQuery) {
        const tableElements = document.querySelectorAll('[id]');

        const table = tables.find((table) => table.tableName.toLowerCase() === clickedTable?.toLowerCase());
        tableElements.forEach(tableElement => {
          if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
            highlightTable(clickedTable);
          }else {
            // reset the styles of the tables with valid IDs
            const tableId = tableElement.getAttribute('id');
            if (isValidTableId(tableId as string)) {
              tableElement.setAttribute('fill', 'white');
              tableElement.setAttribute('stroke', 'black');
            }
          }
          });
      } 
      }, [searchQuery, clickedTable]);

      // onclick of a table, console.log the table name
useEffect(() => {
  const tableElements = document.querySelectorAll('[id]');
  tableElements.forEach(tableElement => {
      tableElement.addEventListener('click', () => {
          // find the clicked table
          const clickedTabeId = tableElement.getAttribute('id');
          const isCorrectFormat = isValidTableId(clickedTabeId as string);

          if (isCorrectFormat) {
              const clickedTableName = tables.find((table) => table.tableId.toLowerCase().includes(clickedTabeId?.toLowerCase() as string));
              
              const table = tables.find((table) => table.tableName.toLowerCase() === clickedTableName?.tableName?.toLowerCase());
              setOpenTable(table);
              if (tableElement.getAttribute('id')?.toLowerCase() === clickedTableName?.tableId?.toLowerCase()) {
                  highlightTable(clickedTableName?.tableName as string);
              } else {
                  // Fill other tables with white and black
                  tableElements.forEach(element => {
                      if (element !== tableElement) {
                          element.setAttribute('fill', 'white');
                          element.setAttribute('stroke', 'black');
                      }
                  });
              }
              setSelectedUser({ tableName: tableElement.getAttribute('id') });
              let selectedTableArr: any[] = [];

              // find a table with the same name as the clicked table

              // find the guests whose table matches the clicked table
              uploadedData?.filter((data: any) => {
                  if (data.tableName === clickedTableName?.tableName) {
                      selectedTableArr.push(data);
                  } else {
                      console.log("data", "no data found");
                  }
              });
              setSelectedTable(selectedTableArr);
              handleOpen();
          }

      });
  });
}, [uploadedData]);




    return (
        <Box bg={'gray.100'}>
        <Flex width={'full'} justifyContent={'start'} alignItems={'center'} pt={8} height={'10px'} mt={2} pl={2} >
          <IconButton
              aria-label="Back"
              icon={<IoIosArrowBack />}
              onClick={() => navigate('/')}
              bg={'gray.300'}
              color={'black'}
              />
              </Flex>
        <PageLayout 
         uploadedData={uploadedData}
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         selectedUser={selectedUser}
         setSelectedUser={setSelectedUser}
         type={'layout'}
         >

          <Center mt={"20px"}  width={'full'} flexDirection={'column'}>
             <SVGComponent />
          </Center>
            </PageLayout>
            <Box px={4}>
            <CustomModal isOpen={isOpen} onClose={handleClose}  title={`${selectedUser?.tableName}`}>
              <Box position={'relative'}>

                <Box px={2} width={'full'} display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'}  mb={8} height={ Number(selectedTable?.length) > 3 ? '430px': '200px'} overflowY={'auto'}>
                    <Box width={'full'} display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'}  mb={8}>
                    {(selectedTable && selectedTable.length !== 0) ? <GuestList guests={selectedTable} />: (
                        <Box width={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}  mt={8}>
                            <Text fontSize="md" color={'black'} textAlign={'center'} >No guest found for this table</Text>
                        </Box>
                    
                    )}
                </Box>
                    </Box>
                     <Box position={'absolute'} top={'110%'} width={'full'} display={'flex'} justifyContent={'center'} borderRadius={'5px'} alignItems={'center'} flexDirection={'column'}   mt={8} bg="gray.100" boxShadow={'sm'} p={2}>
                      <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue'}>Portugues</Text>
                      <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'}>{openTable?.Description_portugues}</Text>
                      <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue'} >English</Text>
                      <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'} >{openTable?.Description_english}</Text>
                    </Box>
              </Box>
            </CustomModal>
            </Box>
        </Box>
    );
}

export default Layout;