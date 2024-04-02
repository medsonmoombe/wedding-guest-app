import { Icon, Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import axios from "axios";

export interface CSVRow {
  [key: string]: string;
}

export interface CSVResult {
  data: string[][];
}

export type CSVHeaders = string[];

interface HeaderProps {
  uploadedData: CSVRow[];
}

const Header = ({ uploadedData }: HeaderProps) => {
  const toast = useToast();


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        let local = 'http://localhost:3000/upload'
        // post the file to localhost 3000 upload use axios
        const result = await axios.post(`${local}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (result.data) {
          // store the fileId in local storage
          localStorage.setItem('fileId', result.data.fileId);
          // reques to get the file from google drive
          toast({
            title: 'File uploaded successfully',
            description: `File "${selectedFile.name}" uploaded successfully to Google Drive.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: 'Error uploading file',
          description: 'An error occurred while uploading the file. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

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

  };

  const handleUploadClick = () => {
    // Programmatically trigger the file selection dialog
    document?.getElementById('file-upload')?.click();
  };




  return (
    <Box width="full">
      <Flex alignItems="center" mt={2} width={'full'} justify={'space-between'} px={4} mb={2}>
        <Icon as={CiLocationOn} color="black" boxSize={50} />
        {uploadedData.length !== 0 && <IconButton
          pos={'relative'}
          aria-label="Upload File"
          icon={<MdOutlineCloudUpload size={50} />}
          color="black"
          variant="none"
          cursor="pointer"
          onClick={handleUploadClick}
        />}
        {uploadedData && uploadedData.length !== 0 && <Icon as={IoIosCheckmark} bg={'gray.200'} width={'20px'} height={'20px'} borderRadius={'50%'} color={'green'} boxSize={6} pos={'absolute'} right={2} />}
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