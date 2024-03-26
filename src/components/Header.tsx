import { Center, Icon, Box, Text, Flex, IconButton, useToast } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineCloudUpload } from "react-icons/md";
import { BsSuitHeartFill } from "react-icons/bs";
import { IoIosCheckmark } from "react-icons/io";
import Papa from 'papaparse';

export interface CSVRow {
    [key: string]: string;
  }
  
  export interface CSVResult {
    data: string[][];
  }
  
  export type CSVHeaders = string[];

  interface HeaderProps {
    uploadedData: CSVRow[];
    setParsedData: (data: CSVRow[]) => void;
  }

const Header = ({ uploadedData, setParsedData }: HeaderProps ) => {
const toast = useToast();


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    // Check if a file is selected
    if (!selectedFile) {
        toast({
            title: 'No file selected',
            description: 'Please select a CSV file to upload.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
      return;
    }
  
    // Parse the selected CSV file
    Papa.parse(selectedFile, {
      complete: (result: CSVResult) => {
        // Handle the parsed CSV data
        console.log('Parsed CSV data:', result.data);
        const headers: CSVHeaders = result.data[0];
        const dataObjects = result.data.slice(1).map((row) => {
          const obj: CSVRow = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });


        setParsedData(dataObjects)
        // store in local storage
        localStorage.setItem('uploadedData', JSON.stringify(dataObjects));
        // You can process the parsed data further here
      },
      error: (error) => {
        // Handle any parsing errors
        toast({
            title: 'Error parsing CSV file',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            });
      },
    });
  };

  const handleUploadClick = () => {
    // Programmatically trigger the file selection dialog
    document?.getElementById('file-upload')?.click();
  };




    return (
        <Box width="full">
        <Center>
            <Flex fontSize="5xl"  fontWeight="bold"  style={{ padding: 0}} fontFamily={"Merienda"}>
              <Text color="black" style={{ padding: 0}}>
                {' '}
                R
              </Text>{' '}
               <Icon as={BsSuitHeartFill} color="red" mt={6} boxSize={8}/>{' '}
              <Text color={'black'}>
                J
              </Text>{' '}
            </Flex>
        </Center>
        <Flex alignItems="center" mt={2} width={'full'} justify={'space-between'} px={4} mb={2}>
            <Icon as={CiLocationOn} color="black" boxSize={50} />
            <Text color={'black'} fontSize={'medium'} fontWeight={'bold'} >
                05/05/2024
            </Text>
        <IconButton
          pos={'relative'}
          aria-label="Upload File"
          icon={<MdOutlineCloudUpload size={50} />}
          color="black"
          variant="none"
          cursor="pointer"
          onClick={handleUploadClick}
        />
        {uploadedData && uploadedData.length !== 0 && <Icon as={IoIosCheckmark} bg={'gray.200'} width={'20px'} height={'20px'} borderRadius={'50%'} color={'green'} boxSize={6} pos={'absolute'} right={2}/>}
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        </Flex>
        </Box>
    );
};
export default Header;