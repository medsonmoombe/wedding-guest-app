import { Box, Text, Center, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SVGComponent from "../components/LayoutComponent";
import GuestList from "../components/GuestList";
// import { IoIosArrowBack } from "react-icons/io";
import tables from "../tables/tables.json";
import { isValidTableId } from "../components/function";

interface LayoutProps {
  uploadedData: any;
  clickedTabel: string;
  searchQuery: string;
  setClickedTable: (value: string) => void;
  activeTabIndex: number;
  setSearchQuery: (value: string) => void;
}

const Layout = ({ uploadedData, clickedTabel, searchQuery, setClickedTable, setSearchQuery }: LayoutProps) => {

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



  useEffect(() => {

    if (searchQuery) {
      clickedTabel = "";
      const tableElements = document.querySelectorAll('[id]');
      const table = tables.find((table) => table.tableName.toLowerCase() === searchQuery?.toLowerCase());
      tableElements.forEach(tableElement => {
        if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
          highlightTable(searchQuery);
        } else {
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
    if (clickedTabel && !searchQuery) {
      const tableElements = document.querySelectorAll('[id]');

      const table = tables.find((table) => table.tableName.toLowerCase() === clickedTabel?.toLowerCase());


      tableElements.forEach(tableElement => {
        if (tableElement.getAttribute('id')?.toLowerCase() === table?.tableId?.toLowerCase()) {
          highlightTable(clickedTabel);
        } else {
          // reset the styles of the tables with valid IDs
          const tableId = tableElement.getAttribute('id');
          if (isValidTableId(tableId as string)) {
            tableElement.setAttribute('fill', 'white');
            tableElement.setAttribute('stroke', 'black');
          }
        }
      });
    }
  }, [searchQuery]);

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




  return (
    <Box bg={'gray.100'}>
      <Center width={'full'} flexDirection={'column'}>
        <SVGComponent />
      </Center>
      <Box px={4} mb={8}>
       {(selectedTable && selectedTable.length !== 0) && 
       <Box width={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={4}>
        <Text fontSize="2xl" fontFamily="Satisfy, cursive" textAlign="center" fontWeight="bold" color={'black'}>
          {selectedTable[0]?.tableName}
        </Text>
              <Box height={selectedTable && selectedTable.length > 5  ? "200px": '100px'} overflowY={'auto'} width={'inherit'}>
                <GuestList guests={selectedTable} />
              </Box>
              </Box>
           }
        {(selectedTable.length > 0) &&
          <Box mb={'30%'} mt={4}>
            <Box width={'full'} display={'flex'} justifyContent={'center'} borderRadius={'5px'} alignItems={'center'} flexDirection={'column'}>
              <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'}>Portugues</Text>
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'}>{openTable?.Description_portugues}</Text>
              <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'} mt={2} >English</Text>
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'} >{openTable?.Description_english}</Text>
            </Box>
          </Box>}

           {selectedTable && selectedTable.length === 0 && openTable && 
           <Center flexDirection={'column'}>
              <Text fontSize="md" color={'black'} textAlign={'center'} fontWeight={'bold'}>
                 {openTable?.tableName}
              </Text>
              <Box mb={'20%'} mt={4}>
            <Box width={'full'} display={'flex'} justifyContent={'center'} borderRadius={'5px'} alignItems={'center'} flexDirection={'column'}>
              <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'}>Portugues</Text>
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'}>{openTable?.Description_portugues}</Text>
              <Text fontSize="md" fontWeight={'bold'} color={'black'} textAlign={'center'} borderBottom={'2px'} borderBottomColor={'blue.400'} mt={2} >English</Text>
              <Text fontSize="sm" color={'black'} textAlign={'center'} fontFamily={'Engagement, cursive'} >{openTable?.Description_english}</Text>
            </Box>
          </Box>
            </Center>}

      </Box>
    </Box>
  );
}

export default Layout;