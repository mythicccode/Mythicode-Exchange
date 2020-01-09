const Object = require('./Object')(1);

Object.initialize().then(() => {
  setInterval(async () => {
    await Object.getData();
  },2000);
});
