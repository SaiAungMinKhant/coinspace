import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BasicTable = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/BTC');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('An error occurred', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/',
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.REACT_APP_API_KEY
          },
          params: {
            start: 1,
            limit: 10,
            price_min: 0,
            price_max: 1000000,
            // Include other query parameters as needed
          }
        }
      );
      setData(response.data.data);
      console.log(response.data.data); // Log the fetched data
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24hr</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row}</TableCell>
              <TableCell align="right">{row}</TableCell>
              <TableCell align="right">{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
