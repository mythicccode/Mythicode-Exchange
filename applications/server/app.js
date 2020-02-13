import Object from './Object.js';

export const startRequesting = () => {
  async function init(){
    // Initializes very first object in order to get number of tokens and gets it
    const initObj = Object(1);
    const tokenCount = await initObj.factoryContract.methods.tokenCount().call();

    // For loop that initializes all objects
    for(let i = 1; i <= tokenCount; i++){
      const object = Object(i);
      await object.start();
    }
    const used = process.memoryUsage().heapUsed / 1024 / 2014;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    return;
  }
  init();
}
