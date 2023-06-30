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
    <div className='bg-black w-4/5 m-auto'>
    <table className='m-auto text-white my-8'>
      <thead>
        <tr className='text-left text-xs border-y border-cyan-900'>
          <th className='p-2'>#</th>
          <th className='p-2'>Name</th>
          <th className='p-2'>Price</th>
          <th className='p-2'>1h%</th>
          <th className='p-2'>24h%</th>
          <th className='p-2'>7d%</th>
          <th className='p-2'>Market Cap</th>
          <th className='p-2'>Volume (24h)</th>
          <th className='p-2'>Circulating Supply</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
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
