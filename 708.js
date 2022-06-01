require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const {
    MongoClient,
    ServerApiVersion,
    ObjectId,
  } = require('mongodb');
const cli = require('nodemon/lib/cli');
  
  const uri = 'mongodb+srv://IngridaVIGI13:byuhblf77@cluster0.eipbj.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  
  app.listen(process.env.PORT, () => {
    console.log('Serveris paleistas. Laukia užklausų', process.env.PORT);
  });

  app.get('/knygos', (request, response) => {
    client.connect(async () => {
    console.log();
      const database = client.db('DB_CRUD');
      const collection = database.collection('knygos');
      const result = await collection.find({}).toArray();
  
      response.json(result);
  
      client.close();
    });
  });

  app.get('/count/:author', (request, response) => {
    client.connect(async () => {
    console.log();
      const database = client.db('DB_CRUD');
      const collection = database.collection('knygos');
      const bookAuthor = Number(request.params.author);
      const result = await collection
      .aggregate([
        { $match: { author: request.params.author } },
        { $group: { _id: "$author", sumaPrice: { $sum: "$price" } } },
      ])
      .toArray();
  
      response.json(result);
  
      client.close();
    });
  });

  app.patch("/knygos", (request, response) => {
    client.connect(function(err, client) {
      if (err) {
        response.send("Something went wrong!!");
        client.close();
      } else {
        const database = client.db("DB_CRUD");
        const collection = database.collection("knygos");
        const { _id, bookTitle, bookPageCount, bookPrice, bookAuthor } = request.body;
        // const _id = req.body._id;
        // const name = req.body.name;
        const filter = { _id: ObjectId(_id) };
        const newValues = { $set: { pageCount: bookPageCount, author: bookAuthor } };
        collection.updateOne(filter, newValues, function (err, result) {
            if (err) {
              response.send("Something went wrong!!");
              client.close();
            } else {
              response.send(result);
               client.close();
            }
          });              
        }
    });
  });

  app.put("/knygos", (request, response) => {
    client.connect(function(err, client) {
      if (err) {
        response.send("Something went wrong!!");
        client.close();
      } else {
        const database = client.db("DB_CRUD");
        const collection = database.collection("knygos");
        const { _id, bookTitle, bookPageCount, bookPrice, bookAuthor } = request.body;
        const filter = { _id: ObjectId(_id) };
        const newValues = { title: bookTitle, pageCount: bookPageCount, price: bookPrice, bookAuthor: author };
        collection.replaceOne(filter, newValues, function (err, result) {
            if (err) {
              response.send("Something went wrong!!");
              client.close();
            } else {
              response.send(result);
               client.close();
            }
          });              
        }
    });
  });
