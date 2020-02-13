import React, { useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

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
        const originalData = res.data;
        setTokenInfo({
          tokenAddress: originalData[0].tokenAddress,
          exchangeAddress: originalData[0].exchangeAddress,
          name: originalData[0].name,
          symbol: originalData[0].symbol
        })

        const newData = originalData.map((dataItem, index) => {
          const time = new Date(dataItem.timeStamp);
          const price = dataItem.marketCap / dataItem.numOfTokens;

          return {price: price, time: time}
        })

        setData(newData);
      })
  }

  window.onload = () => {
    getDataWithId(id);
  }


  return (
    <div className="list-item row">
      <div className="col-sm-12 col-lg-6">
        <h1>{id}</h1>
        <p>{tokenInfo.tokenAddress}</p>
        <p>{tokenInfo.exchangeAddress}</p>
        <p>{tokenInfo.name}</p>
        <p>{tokenInfo.symbol}</p>
      </div>
      <div className="col-sm-12 col-lg-6">
        <LineChart
          width={400}
          height={200}
          data={data}
          margin={{
            top: 5, right: 5, left: 5, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="100 0" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>

    </div>)
}

export default ListItem;
