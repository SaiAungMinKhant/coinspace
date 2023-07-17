import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

const Table = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
        setData(response.data);
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getValueByNestedKey = (object, key) => {
    const keys = key.split(".");
    let value = object;
    for (const k of keys) {
      value = value[k];
    }
    return value;
  };

  const formatPrice = (price) => {
    
    const numericPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.-]+/g, ""))
        : price;
    const precision = sortConfig.direction === "asc" ? 9 : 2;
    const options = {  maximumFractionDigits: precision   }
    const newPrice = Intl.NumberFormat("en-US",options).format(numericPrice);
    return newPrice 
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === null) {
      return 0;
    }

    const aValue = getValueByNestedKey(a, sortConfig.key);
    const bValue = getValueByNestedKey(b, sortConfig.key);

    if (
      sortConfig.key === "Price" ||
      sortConfig.key === "Market Cap" ||
      sortConfig.key === "Volume (24h)"
    ) {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    } else if (sortConfig.key === "name") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  return (
    <div className="w-4/5 m-auto bg-gray-800 text-white">
      <table className="w-full m-auto my-8">
        <thead>
          <tr className="text-left text-xs border-y border-cyan-900">
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("cmc_rank")}
            >
              #
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("quote.USD.price")}
            >
              Price
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("quote.USD.percent_change_1h")}
            >
              1h%
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("quote.USD.percent_change_24h")}
            >
              24h%
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("quote.USD.percent_change_7d")}
            >
              7d%
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("quote.USD.market_cap")}
            >
              Market Cap
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("quote.USD.volume_24h")}
            >
              Volume (24h)
            </th>
            <th
              className="p-2 cursor-pointer text-center"
              onClick={() => handleSort("circulating_supply")}
            >
              Circulating Supply
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr className="text-xs border-y border-cyan-900" key={item.id}>
              <td className="p-2 leading-10">{item.cmc_rank}</td>
              <td className="p-2 leading-10">{item.name} {item.symbol}</td>
              <td className="p-2 leading-10 text-center">
                ${formatPrice(item.quote.USD.price)}
              </td>

              <td
                className={`p-2 leading-10 text-center ${
                  item.quote.USD.percent_change_1h > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                <div className="flex items-center justify-center">
                  <RiArrowUpSFill
                    className={`${
                      item.quote.USD.percent_change_1h < 0 ? "hidden" : ""
                    }`}
                  />
                  <RiArrowDownSFill
                    className={`${
                      item.quote.USD.percent_change_1h > 0 ? "hidden" : ""
                    }`}
                  />
                  {item.quote.USD.percent_change_1h.toFixed(2)}%
                </div>
              </td>

              <td
                className={`p-2 leading-10 text-center ${
                  item.quote.USD.percent_change_24h > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                <div className="flex items-center justify-center">
                  <RiArrowUpSFill
                    className={`${
                      item.quote.USD.percent_change_24h < 0 ? "hidden" : ""
                    }`}
                  />
                  <RiArrowDownSFill
                    className={`${
                      item.quote.USD.percent_change_24h > 0 ? "hidden" : ""
                    }`}
                  />
                  {item.quote.USD.percent_change_24h.toFixed(2)}%
                </div>
              </td>

              <td
                className={`p-2 leading-10 text-center ${
                  item.quote.USD.percent_change_7d > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                <div className="flex items-center justify-center">
                  <RiArrowUpSFill
                    className={`${
                      item.quote.USD.percent_change_7d < 0 ? "hidden" : ""
                    }`}
                  />
                  <RiArrowDownSFill
                    className={`${
                      item.quote.USD.percent_change_7d > 0 ? "hidden" : ""
                    }`}
                  />
                  {item.quote.USD.percent_change_7d.toFixed(2)}%
                </div>
              </td>

              <td className="p-2 leading-10 text-center">
                ${Math.round(item.quote.USD.market_cap)}
              </td>
              <td className="p-2 leading-10 text-center">
                ${Math.round(item.quote.USD.volume_24h)}
              </td>
              <td className="p-2 leading-10 text-center">
                {Math.round(item.circulating_supply)} {item.symbol}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
