import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import * as XLSX from 'xlsx';
import Ports from './components/ports/Ports';
import Ships from './components/ships/Ships';


function App() {
  
  const [shipdata, setData] = useState([]);
  const [portdata,setportData] = useState([]);
  useEffect(() => {
    const fetchshipData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1kMIItzwlj9GenkMRYDNFfp5LkIv-bnDgwMyoIvOXUTk/edit?pli=1#gid=1663339200',{
          method : 'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = () => {
          const data = reader.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
          setData(jsonData);
        };

        reader.readAsBinaryString(blob);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchportData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1Rk5kr9vpOeBZfGhj76f40jLqydQBy6gn5jUc3WWb5GY/edit#gid=1858702126',{
          method : 'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = () => {
          const data = reader.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
          setportData(jsonData);
        };

        reader.readAsBinaryString(blob);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchshipData();
    fetchportData();
  }, []);

  console.log(shipdata);
  console.log(portdata);


  return (
    <div className="App container">
    <h5 className='text-center m-2 p-2'>Enemy Port locations</h5>
     {/* Components */}
     <Ports ports={portdata}/>
     <h5 className='text-center m-2 p-2'>Enemy Ships locations</h5>
     <Ships ships={shipdata}/>
    </div>
  );
}

export default App;
