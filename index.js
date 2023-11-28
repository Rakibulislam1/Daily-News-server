const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v6vphhi.mongodb.net/dailyNews?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const dailyNewsCollection = client.db("dailyNews").collection("add-articles");
    const addPublisherCollection = client.db("dailyNews").collection("add-publisher");
    const usersCollection = client.db("dailyNews").collection("users");
    const dashboardDecline = client.db("dailyNews").collection("decline");
  
    // add articles
    app.post("/add-articles", async (req, res) => {
      const item = req.body;
      const result = await dailyNewsCollection.insertOne(item);
      res.send(result);
    });

    // get articles
    app.get("/add-articles", async (req, res) => {
      const result = await dailyNewsCollection.find().toArray();
      res.send(result);
    });


    app.delete("/add-articles/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dailyNewsCollection.deleteOne(query);
      res.send(result);
    });

    // add publisher
    app.post("/add-publisher", async (req, res) => {
      const item = req.body;
      const result = await addPublisherCollection.insertOne(item);
      res.send(result);
    });

    // get articles
    app.get("/add-publisher", async (req, res) => {
      const result = await addPublisherCollection.find().toArray();
      res.send(result);
    });

    
    // add user
    app.post("/users", async (req, res) => {
      const item = req.body;
      const query = {email: item.email}
      const existingUser = await usersCollection.findOne(query)
      if (existingUser) {
        return res.send({message: 'User Already Exist', insertedId: null})
      }
      const result = await usersCollection.insertOne(item);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// server connection for all project
app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`project server is running on PORT: ${port}`);
});
