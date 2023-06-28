import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        setData(response.data);
      } catch (error) {
        console.error('An error occurred', error);
      }
    };

    fetchData();
  }, []);
  console.log(data)
  

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1h%</th>
          <th>24h%</th>
          <th>7d%</th>
          <th>Market Cap</th>
          <th>Volume (24h)</th>
          <th>Circulating Supply</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.cmc_rank}</td>
            <td>{item.name}</td>
            <td>${item.quote.USD.price}</td>
            <td>{item.quote.USD.percent_change_1h}%</td>
            <td>{item.quote.USD.percent_change_24h}%</td>
            <td>{item.quote.USD.percent_change_7d}%</td>
            <td>${item.quote.USD.market_cap}</td>
            <td>${item.quote.USD.volume_24h}</td>
            <td>{item.circulating_supply}{item.symbol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Table;
