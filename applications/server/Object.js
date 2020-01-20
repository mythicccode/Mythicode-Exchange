const Web3 = require('web3');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://basic_user:bakingSoda@sheabutter-em7q8.mongodb.net/test?retryWrites=true&w=majority';

class Object {
  // constructs an object with id
  // all the static variables are here
  constructor(id) {
    // id is needed to find exchange and token associated with it
    this.id = id;

    // below are all the neccesssary web3 constants
    this.web3 = new Web3('https://mainnet.infura.io/v3/a73e0646d9a04464871e4c7b3510a530');

    this.factoryAddress = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95';
    this.factoryABI = [{
      "name": "NewExchange",
      "inputs": [{
        "type": "address",
        "name": "token",
        "indexed": true
      }, {
        "type": "address",
        "name": "exchange",
        "indexed": true
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "initializeFactory",
      "outputs": [],
      "inputs": [{
        "type": "address",
        "name": "template"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 35725
    }, {
      "name": "createExchange",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "token"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 187911
    }, {
      "name": "getExchange",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "token"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 715
    }, {
      "name": "getToken",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "exchange"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 745
    }, {
      "name": "getTokenWithId",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "token_id"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 736
    }, {
      "name": "exchangeTemplate",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 633
    }, {
      "name": "tokenCount",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 663
    }];

    this.exchangeABI = [{
      "name": "TokenPurchase",
      "inputs": [{
        "type": "address",
        "name": "buyer",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "eth_sold",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "tokens_bought",
        "indexed": true
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "EthPurchase",
      "inputs": [{
        "type": "address",
        "name": "buyer",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "tokens_sold",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "eth_bought",
        "indexed": true
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "AddLiquidity",
      "inputs": [{
        "type": "address",
        "name": "provider",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "eth_amount",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "token_amount",
        "indexed": true
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "RemoveLiquidity",
      "inputs": [{
        "type": "address",
        "name": "provider",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "eth_amount",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "token_amount",
        "indexed": true
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "Transfer",
      "inputs": [{
        "type": "address",
        "name": "_from",
        "indexed": true
      }, {
        "type": "address",
        "name": "_to",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "_value",
        "indexed": false
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "Approval",
      "inputs": [{
        "type": "address",
        "name": "_owner",
        "indexed": true
      }, {
        "type": "address",
        "name": "_spender",
        "indexed": true
      }, {
        "type": "uint256",
        "name": "_value",
        "indexed": false
      }],
      "anonymous": false,
      "type": "event"
    }, {
      "name": "setup",
      "outputs": [],
      "inputs": [{
        "type": "address",
        "name": "token_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 175875
    }, {
      "name": "addLiquidity",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "min_liquidity"
      }, {
        "type": "uint256",
        "name": "max_tokens"
      }, {
        "type": "uint256",
        "name": "deadline"
      }],
      "constant": false,
      "payable": true,
      "type": "function",
      "gas": 82605
    }, {
      "name": "removeLiquidity",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }, {
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "amount"
      }, {
        "type": "uint256",
        "name": "min_eth"
      }, {
        "type": "uint256",
        "name": "min_tokens"
      }, {
        "type": "uint256",
        "name": "deadline"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 116814
    }, {
      "name": "__default__",
      "outputs": [],
      "inputs": [],
      "constant": false,
      "payable": true,
      "type": "function"
    }, {
      "name": "ethToTokenSwapInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "min_tokens"
      }, {
        "type": "uint256",
        "name": "deadline"
      }],
      "constant": false,
      "payable": true,
      "type": "function",
      "gas": 12757
    }, {
      "name": "ethToTokenTransferInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "min_tokens"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }],
      "constant": false,
      "payable": true,
      "type": "function",
      "gas": 12965
    }, {
      "name": "ethToTokenSwapOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }, {
        "type": "uint256",
        "name": "deadline"
      }],
      "constant": false,
      "payable": true,
      "type": "function",
      "gas": 50455
    }, {
      "name": "ethToTokenTransferOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }],
      "constant": false,
      "payable": true,
      "type": "function",
      "gas": 50663
    }, {
      "name": "tokenToEthSwapInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }, {
        "type": "uint256",
        "name": "min_eth"
      }, {
        "type": "uint256",
        "name": "deadline"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 47503
    }, {
      "name": "tokenToEthTransferInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }, {
        "type": "uint256",
        "name": "min_eth"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 47712
    }, {
      "name": "tokenToEthSwapOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "eth_bought"
      }, {
        "type": "uint256",
        "name": "max_tokens"
      }, {
        "type": "uint256",
        "name": "deadline"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 50175
    }, {
      "name": "tokenToEthTransferOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "eth_bought"
      }, {
        "type": "uint256",
        "name": "max_tokens"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 50384
    }, {
      "name": "tokenToTokenSwapInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }, {
        "type": "uint256",
        "name": "min_tokens_bought"
      }, {
        "type": "uint256",
        "name": "min_eth_bought"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "token_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 51007
    }, {
      "name": "tokenToTokenTransferInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }, {
        "type": "uint256",
        "name": "min_tokens_bought"
      }, {
        "type": "uint256",
        "name": "min_eth_bought"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }, {
        "type": "address",
        "name": "token_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 51098
    }, {
      "name": "tokenToTokenSwapOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }, {
        "type": "uint256",
        "name": "max_tokens_sold"
      }, {
        "type": "uint256",
        "name": "max_eth_sold"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "token_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 54928
    }, {
      "name": "tokenToTokenTransferOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }, {
        "type": "uint256",
        "name": "max_tokens_sold"
      }, {
        "type": "uint256",
        "name": "max_eth_sold"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }, {
        "type": "address",
        "name": "token_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 55019
    }, {
      "name": "tokenToExchangeSwapInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }, {
        "type": "uint256",
        "name": "min_tokens_bought"
      }, {
        "type": "uint256",
        "name": "min_eth_bought"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "exchange_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 49342
    }, {
      "name": "tokenToExchangeTransferInput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }, {
        "type": "uint256",
        "name": "min_tokens_bought"
      }, {
        "type": "uint256",
        "name": "min_eth_bought"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }, {
        "type": "address",
        "name": "exchange_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 49532
    }, {
      "name": "tokenToExchangeSwapOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }, {
        "type": "uint256",
        "name": "max_tokens_sold"
      }, {
        "type": "uint256",
        "name": "max_eth_sold"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "exchange_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 53233
    }, {
      "name": "tokenToExchangeTransferOutput",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }, {
        "type": "uint256",
        "name": "max_tokens_sold"
      }, {
        "type": "uint256",
        "name": "max_eth_sold"
      }, {
        "type": "uint256",
        "name": "deadline"
      }, {
        "type": "address",
        "name": "recipient"
      }, {
        "type": "address",
        "name": "exchange_addr"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 53423
    }, {
      "name": "getEthToTokenInputPrice",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "eth_sold"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 5542
    }, {
      "name": "getEthToTokenOutputPrice",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_bought"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 6872
    }, {
      "name": "getTokenToEthInputPrice",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "tokens_sold"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 5637
    }, {
      "name": "getTokenToEthOutputPrice",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "uint256",
        "name": "eth_bought"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 6897
    }, {
      "name": "tokenAddress",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1413
    }, {
      "name": "factoryAddress",
      "outputs": [{
        "type": "address",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1443
    }, {
      "name": "balanceOf",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "_owner"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1645
    }, {
      "name": "transfer",
      "outputs": [{
        "type": "bool",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "_to"
      }, {
        "type": "uint256",
        "name": "_value"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 75034
    }, {
      "name": "transferFrom",
      "outputs": [{
        "type": "bool",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "_from"
      }, {
        "type": "address",
        "name": "_to"
      }, {
        "type": "uint256",
        "name": "_value"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 110907
    }, {
      "name": "approve",
      "outputs": [{
        "type": "bool",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "_spender"
      }, {
        "type": "uint256",
        "name": "_value"
      }],
      "constant": false,
      "payable": false,
      "type": "function",
      "gas": 38769
    }, {
      "name": "allowance",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [{
        "type": "address",
        "name": "_owner"
      }, {
        "type": "address",
        "name": "_spender"
      }],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1925
    }, {
      "name": "name",
      "outputs": [{
        "type": "bytes32",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1623
    }, {
      "name": "symbol",
      "outputs": [{
        "type": "bytes32",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1653
    }, {
      "name": "decimals",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1683
    }, {
      "name": "totalSupply",
      "outputs": [{
        "type": "uint256",
        "name": "out"
      }],
      "inputs": [],
      "constant": true,
      "payable": false,
      "type": "function",
      "gas": 1713
    }];

    this.tokenABI = [{
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }, {
      "constant": false,
      "inputs": [{
        "name": "_spender",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }],
      "name": "approve",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }, {
      "constant": false,
      "inputs": [{
        "name": "_from",
        "type": "address"
      }, {
        "name": "_to",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }],
      "name": "transferFrom",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{
        "name": "",
        "type": "uint8"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }, {
      "constant": true,
      "inputs": [{
        "name": "_owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "name": "balance",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }, {
      "constant": false,
      "inputs": [{
        "name": "_to",
        "type": "address"
      }, {
        "name": "_value",
        "type": "uint256"
      }],
      "name": "transfer",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "constant": true,
      "inputs": [{
        "name": "_owner",
        "type": "address"
      }, {
        "name": "_spender",
        "type": "address"
      }],
      "name": "allowance",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }, {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "name": "owner",
        "type": "address"
      }, {
        "indexed": true,
        "name": "spender",
        "type": "address"
      }, {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }],
      "name": "Approval",
      "type": "event"
    }, {
      "anonymous": false,
      "inputs": [{
        "indexed": true,
        "name": "from",
        "type": "address"
      }, {
        "indexed": true,
        "name": "to",
        "type": "address"
      }, {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }],
      "name": "Transfer",
      "type": "event"
    }];

    this.factoryContract = new this.web3.eth.Contract(this.factoryABI, this.factoryAddress);

    console.log("Object Initialized");
  }

  //all asyncronous variables
  async getData() {
    const tokenAddress = await this.factoryContract.methods.getTokenWithId(this.id).call();
    const exchangeAddress = await this.factoryContract.methods.getExchange(tokenAddress).call();

    const tokenContract = new this.web3.eth.Contract(this.tokenABI, tokenAddress);
    const exchangeContract = new this.web3.eth.Contract(this.exchangeABI, exchangeAddress);
    const marketCap = await this.web3.eth.getBalance(exchangeAddress);

    let numOfTokens;
    let name;
    let symbol;

    try {
      numOfTokens = await tokenContract.methods.balanceOf(exchangeAddress).call()
    } catch (error) {
      numOfTokens = "No balanceOf() method"
    }

    try {
      name = await tokenContract.methods.name().call()
    } catch (error) {
      name = "No name() method"
    }

    try {
      symbol = await tokenContract.methods.symbol().call()
    } catch (error) {
      symbol = "No symbol() method"
    }
    //this returns an array with all the data acquired from blockchain using web3
    return [marketCap, numOfTokens, name, symbol, exchangeAddress, tokenAddress];
  }

  // a method that writes what getData() returns to a file
  async writeToDB() {
      // establishing a connection to mongodb
      const client = await mongoClient.connect(url, { useUnifiedTopology: true });
      // establishing an object that represents collection on mongodb
      const collection = client.db('test').collection('uniswap');

      let exchangeData;
      let now = new Date();
      // retrieving data for exchange at this moment
      exchangeData = await this.getData();

      // sending data to mongodb
      collection.insertOne({
        "marketCap": exchangeData[0],
        "numOfTokens": exchangeData[1],
        "name": exchangeData[2],
        "symbol": exchangeData[3],
        "exchangeAddress": exchangeData[4],
        "tokenAddress": exchangeData[5],
        "timestamp": now,
      }, (error, res) => {
        if(error) throw error;
        console.log("inserted");
        //closes the connection to mongodb when inserting is done
        client.close();
      });

  }
}

module.exports = (id) => {
    return new Object(id)
}
