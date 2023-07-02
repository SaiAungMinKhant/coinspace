import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === null) {
      return 0;
    }
  
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
  
    // Handle sorting for different column types
    if (sortConfig.key === 'Price' || sortConfig.key === 'Market Cap' || sortConfig.key === 'Volume (24h)') {
      aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
      bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
    } else {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
  
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  return (
    <div className='bg-black w-4/5 m-auto'>
      <table className='m-auto text-white my-8'>
        <thead>
          <tr className='text-left text-xs border-y border-cyan-900'>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('cmc_rank')}>
              #
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('name')}>
              Name
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('quote.USD.price')}>
              Price
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('quote.USD.percent_change_1h')}>
              1h%
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('quote.USD.percent_change_24h')}>
              24h%
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('quote.USD.percent_change_7d')}>
              7d%
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('quote.USD.market_cap')}>
              Market Cap
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('quote.USD.volume_24h')}>
              Volume (24h)
            </th>
            <th className='p-2 cursor-pointer' onClick={() => handleSort('circulating_supply')}>
              Circulating Supply
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr className='text-sm border-y border-cyan-900' key={item.id}>
              <td className='p-2 leading-10'>{item.cmc_rank}</td>
              <td className='p-2 leading-10'>{item.name}</td>
              <td className='p-2 leading-10'>${item.quote.USD.price.toFixed(2)}</td>
              <td className='p-2 leading-10'>{item.quote.USD.percent_change_1h.toFixed(2)}%</td>
              <td className='p-2 leading-10'>{item.quote.USD.percent_change_24h.toFixed(2)}%</td>
              <td className='p-2 leading-10'>{item.quote.USD.percent_change_7d.toFixed(2)}%</td>
              <td className='p-2 leading-10'>${Math.round(item.quote.USD.market_cap)}</td>
              <td className='p-2 leading-10'>${Math.round(item.quote.USD.volume_24h)}</td>
              <td className='p-2 leading-10'>{Math.round(item.circulating_supply)}{item.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
