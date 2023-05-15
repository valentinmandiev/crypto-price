import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Image } from "react-bootstrap";
import "./App.css";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 18,
            page: 1,
          },
        }
      );
      setCryptoData(response.data);
    };

    fetchData();
  }, []);

  return (
    <Table className="table" striped bordered hover>
      <thead className="thead">
        <tr>
          <th>Name</th>
          <th>Price (USD)</th>
          <th>Crypto-Logo</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.name}</td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td>
              <Image src={coin.image} alt={coin.name} height="30" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptoTable;
