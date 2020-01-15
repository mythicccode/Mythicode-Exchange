const mongoClient = require('mongodb').MongoClient
// wicked bad practice to have your username and password out in the open like this but we gucci for now
const url = 'mongodb+srv://basic_user:bakingSoda@sheabutter-em7q8.mongodb.net/test?retryWrites=true&w=majority'
// just test stuff here
mongoClient.connect(url, (err, client) => {
       const db = client.db('test');
       db.collection('inventory').insertOne({
       item: "canvas",
       qty: 100,
       tags: ["cotton"],
       size: { h: 28, w: 35.5, uom: "cm" }
       })
       .then(function(result) {
       });
       client.close();
});