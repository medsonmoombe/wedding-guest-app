import { Box, Text, Center } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import SVGComponent from "../components/LayoutComponent";
import CustomModal from "../components/modal/PopUpModal";
import GuestList from "../components/GuestList";
// import { IoIosArrowBack } from "react-icons/io";
import tables from "../tables/tables.json";
import { isValidTableId } from "../components/function";

interface LayoutProps {
    uploadedData: any;
    clickedTabel: string;
    searchQuery: string;
    activeTabIndex: number;
    setSearchQuery: (value: string) => void;
}

const Layout = ({uploadedData,clickedTabel, searchQuery, activeTabIndex, setSearchQuery}: LayoutProps) => {

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<any[]>([]);
    const [openTable, setOpenTable] = useState<any>(null);



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
        clickedTabel = "";
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
      if(clickedTabel && !searchQuery) {
        const tableElements = document.querySelectorAll('[id]');

        const table = tables.find((table) => table.tableName.toLowerCase() === clickedTabel?.toLowerCase());
        if(activeTabIndex === 1) {
          setSearchQuery(table?.tableName as string);
        }else {
          setSearchQuery("");
        }

        tableElements.forEach(tableElement => {
          if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
            highlightTable(clickedTabel);
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
      }, [searchQuery, clickedTabel, activeTabIndex]);

      // onclick of a table, console.log the table name
useEffect(() => {
  const tableElements = document.querySelectorAll('[id]');
  tableElements.forEach(tableElement => {
      tableElement.addEventListener('click', () => {
          // find the clicked table
          const clickedTabeId = tableElement.getAttribute('id');
          const isCorrectFormat = isValidTableId(clickedTabeId as string);

          if (isCorrectFormat) {
              const clickedTabelName = tables.find((table) => table.tableId.toLowerCase().includes(clickedTabeId?.toLowerCase() as string));
              
              const table = tables.find((table) => table.tableName.toLowerCase() === clickedTabelName?.tableName?.toLowerCase());
              setOpenTable(table);
              if (tableElement.getAttribute('id')?.toLowerCase() === clickedTabelName?.tableId?.toLowerCase()) {
                  highlightTable(clickedTabelName?.tableName as string);
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
                  if (data.tableName === clickedTabelName?.tableName) {
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
          <Center  width={'full'} flexDirection={'column'}>
             <SVGComponent />
          </Center>
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
                     <Box position={'absolute'} top={'110%'} width={'full'} display={'flex'} justifyContent={'center'} borderRadius={'5px'} alignItems={'center'} flexDirection={'column'}   mt={8} bg="rgba(243, 246, 241, 0.73)" boxShadow={'sm'} p={2}>
                      <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue'}>Portugues</Text>
                      <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'}>{openTable?.Description_portugues}</Text>
                      <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue'} mt={2} >English</Text>
                      <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'} >{openTable?.Description_english}</Text>
                    </Box>
              </Box>
            </CustomModal>
            </Box>
        </Box>
    );
}

export default Layout;