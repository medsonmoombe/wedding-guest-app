import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CSVHeaders, CSVResult, CSVRow } from './components/Header';
import {  useEffect, useState } from 'react';
import axios from 'axios';
// import Papa from 'papaparse';
import { useToast } from '@chakra-ui/react';
import { base_url } from './components/constants/enviroments';
import HomeDisplay from './pages';
import { useQuery } from 'react-query';
import guestList from './data/guestList.json';
import { useSetRecoilState } from 'recoil';
import { imagesAtom } from './recoil/atom';

function App() {
  // const [uploadedData, setUploadedData] = useState<CSVRow[]>([]);
  // const [parsedData, setParsedData] = useState<any>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const toast = useToast();


  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent the default behavior
      setDeferredPrompt(event); // Save the event for later use
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      // Show the installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the installation prompt');
        } else {
          console.log('User dismissed the installation prompt');
        }

        setDeferredPrompt(null); // Reset the deferredPrompt state
      });
    }
  };


  useEffect(() => {
    // Check if the app is installed
    const isAppAlreadyInstalled = window.matchMedia('(display-mode: standalone)').matches;
    setIsAppInstalled(isAppAlreadyInstalled);
  }, []);

  // useEffect(() => {
  //   const fileId = localStorage.getItem('fileId') || file_id;

  //   if (fileId) {
  //     const getFile = async () => {
  //       const response = await axios.get(`${base_url}/file?fileId=${fileId}`);
  //       if (response.data) {

  //         Papa.parse(response.data, {
  //           complete: (result: CSVResult) => {
  //             const headers: CSVHeaders = result.data[0];
  //             const dataObjects = result.data.slice(1).map((row) => {
  //               const obj: CSVRow = {};
  //               headers.forEach((header, index) => {
  //                 obj[header] = row[index];
  //               });
  //               return obj;
  //             });
  //             setParsedData(dataObjects);
  //           },
  //           error: (error) => {
  //             // Handle any parsing errors
  //             toast({
  //               title: 'Error parsing CSV file',
  //               description: error.message,
  //               status: 'error',
  //               duration: 5000,
  //               isClosable: true,
  //             });
  //           },
  //         });
  //       }
  //     };
  //     getFile();
  //   }
  // }, []);

  // const getLocalStorage = () => {
  //   try {
  //     return JSON.parse(localStorage.getItem('uploadedData') || '');
  //   } catch (error) {
  //     return null;
  //   }
  // };


  // useEffect(() => {

  //   if (parsedData) {
  //     setUploadedData(getLocalStorage());
  //   }
  // }, [parsedData]);

  const setImages = useSetRecoilState(imagesAtom);

  useEffect(() => {
    if (photos.length > 0) {
      setImages(photos);
    }
  }, [photos, setImages]);


  const getAllImages = useQuery('allImages', async () => {
    const response = await axios.get(`${base_url}/allImages`);
    return response.data.images;
  }, {
    onSuccess: (data) => {
      setPhotos(data);
    },
    onError: (error) => {
      toast({
        title: 'Error fetching images',
        description: 'An error occurred while fetching images from the server',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    },
  }
  );


  // filter the data to avoid duplicates by guest name if guestFirstName and guestLastName are the same
  const filteredData = guestList?.filter((v: { guestFirstName: any; guestLastName: any; }, i: any, a: any[]) => a.findIndex((t: { guestFirstName: any; guestLastName: any; }) => (t.guestFirstName === v.guestFirstName && t.guestLastName === v.guestLastName)) === i);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeDisplay uploadedData={filteredData} isFetchingImages={getAllImages.isLoading} handleAddToHomeScreen={handleAddToHomeScreen} isAppInstalled={isAppInstalled}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
