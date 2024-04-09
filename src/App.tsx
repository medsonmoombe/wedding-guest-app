import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CSVHeaders, CSVResult, CSVRow } from './components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { useToast } from '@chakra-ui/react';
import { base_url, file_id } from './components/constants/enviroments';
import HomeDisplay from './pages';

function App() {
  const [uploadedData, setUploadedData] = useState<CSVRow[]>([]);
  const [parsedData, setParsedData] = useState<any>([]);
  const [uploadedPicture, setUploadedPicture] = useState<File | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const toast = useToast();



  const uploadPhotos = async() => {
    try {
      const response = await axios.get(`http://localhost:3000/s3Url`);

      if(response){
        console.log("response", response.data)
      }
      
    } catch (error) {
      console.log("error", error)
    }
  }



  useEffect(() => {
    const fileId = localStorage.getItem('fileId') || file_id;

    if (fileId) {
      const getFile = async () => {
        const response = await axios.get(`${base_url}/file?fileId=${fileId}`);
        if (response.data) {

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
  }, []);

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


  const getAllImagesFromS3 = async () => {
    try {
      const response = await axios.get(`${base_url}/allImages`);
  
      if(response){
        console.log("response", response.data)
        setPhotos(response.data.images)
      }
      
    } catch (error) {
      console.log("error", error)
    }
  }
  
  
  useEffect(() => {
    getAllImagesFromS3();
  }, []);


  console.log(uploadedData)

  // filter the data to avoid duplicates by guest name if guestFirstName and guestLastName are the same
  const filteredData = parsedData?.filter((v: { guestFirstName: any; guestLastName: any; }, i: any, a: any[]) => a.findIndex((t: { guestFirstName: any; guestLastName: any; }) => (t.guestFirstName === v.guestFirstName && t.guestLastName === v.guestLastName)) === i);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeDisplay uploadedData={filteredData} photos={photos}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
