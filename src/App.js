import React, {useState} from 'react';
import Header from './components/Header';
import ListItem from './components/ListItem';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const [distinctIds, setDistinctIds] = useState([]);

  const getDistinctIds = () => {
    // getting all distinct ids
    axios.get('http://localhost:3001/distinct')
      .then(res => {
        setDistinctIds(res.data);
      })
  }

  window.onload = () => {
    getDistinctIds();
    console.log('loaded');
  }



    return (
      <div>
        <Header />
        <ListItem key={3} id={3} />
        <Footer />
      </div>
    )
  }

export default App;
