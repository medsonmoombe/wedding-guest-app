import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header, { CSVRow } from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [uploadedData, setUploadedData] = useState<CSVRow[]>([]);
const [parsedData, setParsedData] = useState<CSVRow[]>([]);

useEffect(() => {
  const data = localStorage.getItem('uploadedData');
  if (data) {
    setUploadedData(JSON.parse(data));
  }
}, [parsedData]);

  return (
    <>
        <Router>
            <Header uploadedData={uploadedData}  setParsedData={setParsedData}/>
          <Routes>
            <Route path="/" element={<HomePage uploadedData={uploadedData}/>} />
          </Routes>
        </Router>
    </>
  )
}

export default App
