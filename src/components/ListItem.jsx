import React, { useState } from 'react';
import axios from 'axios';

function ListItem(props) {
  const id = props.id;
  const [data, setData] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({
    tokenAddress: "",
    exchangeAddress: "",
    name: "",
    symbol: ""
  });


  const getDataWithId = (uniqueId) => {
    // getting all data for an id
    axios.get('http://localhost:3001/db/' + uniqueId)
      .then(res => {
        setData(res.data);
        setTokenInfo({
          tokenAddress: res.data[0].tokenAddress,
          exchangeAddress: res.data[0].exchangeAddress,
          name: res.data[0].name,
          symbol: res.data[0].symbol
        })
      })
  }
  getDataWithId(id);

  return (
    <div className="list-item">
      <h1>{id}</h1>
      <p>{tokenInfo.tokenAddress}</p>
      <p>{tokenInfo.exchangeAddress}</p>
      <p>{tokenInfo.name}</p>
      <p>{tokenInfo.symbol}</p>
    </div>)
}

export default ListItem;
