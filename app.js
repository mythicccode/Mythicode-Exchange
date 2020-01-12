//test initiator that creates an Object and starts its functionality

for(let i = 1; i < 10; i++){
  const Object = require('./Object')(i);
  Object.start();
}
