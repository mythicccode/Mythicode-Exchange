import mongoose from 'mongoose';

const url = 'mongodb+srv://basic_user:bakingSoda@sheabutter-em7q8.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const ExchangeSchema = new mongoose.Schema({
  id: Number,
  tokenAddress: String,
  exchangeAddress: String,
  marketCap: Number,
  numOfTokens: Number,
  name: String,
  symbol: String,
  timeStamp: String
});

const ExchangeDB = mongoose.model("ExchangeDB", ExchangeSchema);

module.exports = ExchangeDB;
