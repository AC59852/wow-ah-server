require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

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