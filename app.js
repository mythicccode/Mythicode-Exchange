const Object = require('./Object')(1);


setInterval(async () => {
  const result = await Object.writeToFile();
  console.log(result);
},2000);
