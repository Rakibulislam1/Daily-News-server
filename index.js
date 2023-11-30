const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_KEY);

const jwt = require("jsonwebtoken");

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dummy-d6041.web.app",
      "https://dummy-d6041.firebaseapp.com",
    ],
    credentials: true,
  })
);
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

// jwt
const verifyToken = async (req, res, next) => {
  // console.log("inside verify token", req.headers);

  if (!req.headers.authorization) {
    return res.status(401).send({ message: "forbidden access" });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const dailyNewsCollection = client
      .db("dailyNews")
      .collection("add-articles");
    const addPublisherCollection = client
      .db("dailyNews")
      .collection("add-publisher");
    const usersCollection = client.db("dailyNews").collection("users");
    const dashboardDecline = client.db("dailyNews").collection("decline");

    // add articles
    app.post("/add-articles", async (req, res) => {
      const item = req.body;
      const result = await dailyNewsCollection.insertOne(item);
      res.send(result);
    });

    // get articles
    app.get("/add-articles", verifyToken, async (req, res) => {
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
      const query = { email: item.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User Already Exist", insertedId: null });
      }
      const result = await usersCollection.insertOne(item);
      res.send(result);
    });

    // get user
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    //make Admin
    app.patch("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "Admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //make role
    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let admin = false;

      if (user) {
        admin = user.role == "Admin";
      }
      res.send({ admin });
    });

    //make premium
    app.patch("/add-articles/premium/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          plan: "Premium",
        },
      };
      const result = await dailyNewsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //approved
    app.patch("/add-articles/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;

      const query = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: {
          status: data.status,
        },
      };
      const result = await dailyNewsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //DashboardDecline post
    app.post("/decline", async (req, res) => {
      const article = req.body;
      const result = await dashboardDecline.insertOne(article);
      res.send(result);
    });

    //DashboardDecline get
    app.get("/decline", async (req, res) => {
      const result = await dashboardDecline.find().toArray();
      res.send(result);
    });

    //my article
    app.get("/add-articles/myArticle", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await dailyNewsCollection.find(query).toArray();
      res.send(result);
    });

    //my article delete
    app.delete("/add-articles/myArticle/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dailyNewsCollection.deleteOne(query);
      res.send(result);
    });

    //my article get
    app.get("/add-articles/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dailyNewsCollection.findOne(query);
      res.send(result);
    });

    //my article update
    app.patch("/add-articles/update/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          title: data.title,
          image: data.image,
          publisher: data.publisher,
          tag: data.tag,
          description: data.description,
        },
      };
      const result = await dailyNewsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // all article get
    app.get("/add-articles/approve", async (req, res) => {
      const query = { status: "Approve" };
      const result = await dailyNewsCollection.find(query).toArray();
      res.send(result);
    });

    // get view details
    app.get("/add-articles/viewDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dailyNewsCollection.findOne(query);
      res.send(result);
    });

    // all article get
    app.get("/add-articles/approve", async (req, res) => {
      const query = { status: "Approve" };
      const result = await dailyNewsCollection.find(query).toArray();
      res.send(result);
    });

    // premium article get
    app.get("/premiumArticle", async (req, res) => {
      const plan = req.query.plan;
      const query = { plan: plan };
      const result = await dailyNewsCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });

    // jwt
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_TOKEN, {
        expiresIn: "250h",
      });
      res.send({ token });
    });

    //stripe post payment
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get("/disablePremiumButton/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });



    //stripe patch payment
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const data = req.body;
      const updateDoc = {
        $set: {
          premiumTaken: data.premiumTaken,
          price: data.amount,
          transactionId: data.transactionId,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
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
