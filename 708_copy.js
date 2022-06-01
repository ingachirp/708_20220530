app.patch("/user", (req, res) => {
    mongoClient.connect(async function (err, client) {
      if (err) {
        res.send("Something went wrong!!");
        client.close();
      } else {
        const database = client.db("usersdb");
        const collection = database.collection("users");
        const { _id, name } = req.body;
        // const _id = req.params.body._id;
        // const name = req.params.body.name;
        const filter = { _id: ObjectId(_id) };
        const newValues = { $set: { name: name } };

        //naudojant async f-cija
        try {
          const result = await collection.updateOne(filter, newValues);
          res.send(result);
          client.close();
        } catch (err) {
          res.send("Something went wrong!!");
          client.close();
        }
      }
    });
  });

  app.put("/user", (req, res) => {
    mongoClient.connect(async function (err, client) {
      if (err) {
        res.send("Something went wrong!!");
        client.close();
      } else {
        const database = client.db("usersdb");
        const collection = database.collection("users");
        const { _id, name } = req.body;
        const filter = { _id: ObjectId(_id) };
        const newValues = { name: name };
        try {
          const result = await collection.replaceOne(filter, newValues);
          res.send(result);
        } catch (err) {
          res.send("Something went wrong!!");
        }
        client.close();
      }
    });
  });

  // su count

  app.get("/count", (req, res) => {
    mongoClient.connect(async function (err, client) {
      if (err) {
        res.send("Something went wrong!!");
        client.close();
      } else {
        const database = client.db("usersdb");
        const collection = database.collection("users");
        const result = await collection.countDocuments({ age: { $gt: 25 } });
        res.send(`result: ${result}`);
      }
    });
  });