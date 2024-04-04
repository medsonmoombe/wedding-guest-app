import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import  { CSVHeaders, CSVResult, CSVRow } from './components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { useToast } from '@chakra-ui/react';
import { base_url, file_id } from './components/constants/enviroments';
import Layout from './pages/Layout';

function App() {
  const [uploadedData, setUploadedData] = useState<CSVRow[]>([]);
const [parsedData, setParsedData] = useState<any>([]);
const toast = useToast();



useEffect(() => {
  const fileId = localStorage.getItem('fileId') || file_id;

  if(fileId) {
  const getFile = async() => {
      const response = await axios.get(`${base_url}/file?fileId=${fileId}`);
    if(response.data){

      Papa.parse(response.data, {
        complete: (result: CSVResult) => {
          const headers: CSVHeaders = result.data[0];
          const dataObjects = result.data.slice(1).map((row) => {
            const obj: CSVRow = {};
            headers.forEach((header, index) => {
              obj[header] = row[index];
            });
            return obj;
          });
          setParsedData(dataObjects);
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
    }
    };
    getFile();
  }
  },[]);

  const getLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('uploadedData') || '');
    } catch (error) {
        return null;
    }
};


useEffect(() => {

  if (parsedData) {
    setUploadedData(getLocalStorage());
  }
}, [parsedData]);


console.log(uploadedData);
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage uploadedData={parsedData}/>} />
            <Route path="/layout" element={<Layout uploadedData={parsedData}/>} />
          </Routes>
        </Router>
    </>
  )
}

export default App
