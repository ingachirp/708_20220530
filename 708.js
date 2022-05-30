require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const {
    MongoClient,
    ServerApiVersion,
    ObjectId,
  } = require('mongodb');
  
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