require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

// const oauthRoute = 'https://oauth.battle.net/token';

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  getAuthData().then((data) => {
    return data;
  })
  .then((data) => {
    res.send(data.data);
  })
})

app.get('/items', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    const collection = client.db("item").collection("all");

    collection.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
})

async function getAuthData() {
  const response = await axios.post(
    'https://oauth.battle.net/token',
    new URLSearchParams({
        'grant_type': 'client_credentials'
    }),
    {
        auth: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET
        }
    }
  );
  return response;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));