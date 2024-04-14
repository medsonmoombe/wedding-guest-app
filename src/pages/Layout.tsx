import { Box, Text, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SVGComponent from "../components/LayoutComponent";
import GuestList from "../components/GuestList";
// import { IoIosArrowBack } from "react-icons/io";
import tables from "../tables/tables.json";
import { isValidTableId } from "../components/function";

interface LayoutProps {
  uploadedData: any;
  clickedTabel: string;
  setClickedTable: (value: string) => void;
  activeTabIndex: number;
  setSearchQuery: (value: string) => void;
  searchQuery: string;
  selectedUser: any;
}

const Layout = ({ uploadedData, clickedTabel, setClickedTable, setSearchQuery, searchQuery, selectedUser }: LayoutProps) => {

  const [selectedTable, setSelectedTable] = useState<any[]>([]);
  const [openTable, setOpenTable] = useState<any>(null);




  const handleOpen = (id: string) => {
    setClickedTable("");
    setSearchQuery("");
    // Reset styles of tables with valid IDs only higlight the clicked table
    const tableElements = document.querySelectorAll('[id]');
    tableElements.forEach(tableElement => {
      const tableId = tableElement.getAttribute('id');
      if (tableId?.toLowerCase() === id?.toLowerCase()) {
        tableElement.setAttribute('fill', '#00a86b');
        tableElement.setAttribute('stroke', '#00a86b');
      } else {
        if (isValidTableId(tableId as string)) {
          tableElement.setAttribute('fill', 'white');
          tableElement.setAttribute('stroke', 'black');
        }
      }
    });
  }


  // find the table by search query
   // if clickedtable is not empty, find the table with the same name as the clicked table
   useEffect(() => {
    if (selectedUser) {
      const table = tables.find((table) => table.tableName.toLowerCase() === selectedUser?.tableName?.toLowerCase());
      setOpenTable(table);
      const tableElements = document.querySelectorAll('[id]');
      tableElements.forEach(tableElement => {
        if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
          highlightClickedTable(table?.tableId as string);
        } else {
          // reset the styles of the tables with valid IDs
          const tableId = tableElement.getAttribute('id');
          if (isValidTableId(tableId as string)) {
            tableElement.setAttribute('fill', 'white');
            tableElement.setAttribute('stroke', 'black');
          }
        }
      });
      let selectedTableArr: any[] = [];
      uploadedData?.filter((data: any) => {
        if (data.tableName.toLowerCase() === table?.tableName.toLowerCase()) {
          selectedTableArr.push(data);
        }
      });
      setSelectedTable(selectedTableArr);
    }
  }, [selectedUser ]);


  const highlightClickedTable = (tableId: string) => {
    // Find the SVG element by its name attribute
    const tableElements = document.querySelectorAll('[id]');
    const table = tables.find((table) => table.tableId.toLowerCase() === tableId?.toLowerCase());
    // Loop through each table element to find the matching one
    tableElements.forEach(tableElement => {
      if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
        tableElement.setAttribute('fill', '#00a86b');
        tableElement.setAttribute('stroke', '#00a86b');
      }
    });

  }


  // if searchQuery is empty reset the hightlighted table or search query does not match any table

  useEffect(() => {
    if (!searchQuery) {
      const tableElements = document.querySelectorAll('[id]');
      tableElements.forEach(tableElement => {
        const tableId = tableElement.getAttribute('id');
        if (isValidTableId(tableId as string)) {
          tableElement.setAttribute('fill', 'white');
          tableElement.setAttribute('stroke', 'black');
        }
      });
    }
  }, [searchQuery]);


  // reset the tables styles when the search query does not match any table

  useEffect(() => {
    if (searchQuery && !selectedUser) {
      const tableElements = document.querySelectorAll('[id]');
      tableElements.forEach(tableElement => {
        const tableId = tableElement.getAttribute('id');
        if (isValidTableId(tableId as string)) {
          tableElement.setAttribute('fill', 'white');
          tableElement.setAttribute('stroke', 'black');
        }
      });
    }
  }, [searchQuery, selectedTable]);

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

          // console.log("clickedTabelName", clickedTabelName);

          const table = tables.find((table) => table.tableName.toLowerCase() === clickedTabelName?.tableName?.toLowerCase());
          setOpenTable(table);
          if (tableElement.getAttribute('id')?.toLowerCase() === clickedTabelName?.tableId?.toLowerCase()) {
            highlightClickedTable(clickedTabeId as string);
          } else {
            // Fill other tables with white and black
            tableElements.forEach(element => {
              if (element !== tableElement) {
                element.setAttribute('fill', 'white');
                element.setAttribute('stroke', 'black');
              }
            });
          }
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
          handleOpen(clickedTabeId as string);
        }

      });
    });
  }, [uploadedData, clickedTabel]);


 // if clickedtable is not empty, find the table with the same name as the clicked table
  useEffect(() => {
    if (clickedTabel) {
      const table = tables.find((table) => table.tableName.toLowerCase() === clickedTabel?.toLowerCase());
      setOpenTable(table);
      const tableElements = document.querySelectorAll('[id]');
      tableElements.forEach(tableElement => {
        if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
          highlightClickedTable(table?.tableId as string);
        } else {
          // reset the styles of the tables with valid IDs
          const tableId = tableElement.getAttribute('id');
          if (isValidTableId(tableId as string)) {
            tableElement.setAttribute('fill', 'white');
            tableElement.setAttribute('stroke', 'black');
          }
        }
      });
      let selectedTableArr: any[] = [];
      uploadedData?.filter((data: any) => {
        if (data.tableName === clickedTabel) {
          selectedTableArr.push(data);
        }
      });
      setSelectedTable(selectedTableArr);
    }
  }, [clickedTabel]);



  return (
    <Box height={'auto'} bg={'gray.100'}>
      { selectedUser && openTable && <Box width={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={2}>
        <Text fontSize="xl" textAlign="center" fontWeight="bold" color={'black'} >
          {`${selectedUser?.guestFirstName} ${selectedUser?.guestLastName}`}
        </Text>
        <Text fontSize="xl" textAlign="center" fontWeight="bold" color={'black'} >
          {`${openTable?.tableId}`}
        </Text>
      </Box>}
      <Center width={'full'} flexDirection={'column'}>
        <SVGComponent />
      </Center>
      <Box px={4} mb={8} bg={'gray.100'}>
       {( (searchQuery || clickedTabel ) && selectedUser  && selectedTable && selectedTable.length !== 0) && 
       <Box width={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={4}>
        <Text fontSize="xl" textAlign="center" fontWeight="bold" color={'black'} fontFamily={'Satisfy, cursive'} >
          {`${selectedTable[0]?.tableName} Guests`}
         </Text>
              <Box  width={'inherit'}>
                <GuestList guests={selectedTable} />
              </Box>
              </Box>
           }
        {( (searchQuery || clickedTabel) &&  selectedTable.length > 0 && selectedUser) &&
          <Box mb={'30%'} mt={4}>
            <Box width={'full'} display={'flex'} justifyContent={'center'} borderRadius={'5px'} alignItems={'center'} flexDirection={'column'} gap={2}>
              {/* <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'}>Portugues</Text> */}
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'}>{openTable?.Description_portugues}</Text>
              {/* <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'} mt={2} >English</Text> */}
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'} >{openTable?.Description_english}</Text>
            </Box>
          </Box>}

           {(searchQuery || clickedTabel) && selectedUser &&  selectedTable && selectedTable.length === 0 && openTable && 
           <Center flexDirection={'column'} >
              <Text fontSize="md" color={'black'} textAlign={'center'} fontWeight={'bold'} fontFamily={'Satisfy, cursive'} >
                 {openTable?.tableName}
              </Text>
              <Box mb={'20%'} mt={4}>
            <Box width={'full'} display={'flex'} justifyContent={'center'} borderRadius={'5px'} alignItems={'center'} flexDirection={'column'} gap={2}>
              {/* <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'}>Portugues</Text> */}
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'}>{openTable?.Description_portugues}</Text>
              {/* <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'} mt={2} >English</Text> */}
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'} >{openTable?.Description_english}</Text>
            </Box>
          </Box>
          </Center>}

      </Box>
    </Box>
  );
}

export default Layout;