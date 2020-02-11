import express from 'express';
import ExchangeDB from './db.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/distinct', (req, res) => {
  //finding the list of all distinct ids
  ExchangeDB.distinct("id", (error, listOfIds) => {
    res.send(listOfIds);
  });
});

app.get('/db/:id', (req, res) => {
  const id = req.params.id;

  ExchangeDB.find({"id": id}, (error, list) => {
    res.send(list);
  })

})

export default app;
