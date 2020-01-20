//test initiator that creates an Object and starts its functionality
async function init(){
  // Initializes very first object in order to get number of tokens and gets it
  const initObj = require('./applications/server/Object')(1);
  const tokenCount = await initObj.factoryContract.methods.tokenCount().call();

  // For loop that initializes all objects
  for(let i = 1; i < 1; i++){
    const Object = require('./Object')(i);
    await Object.writeToDB();
  }
}

init();
