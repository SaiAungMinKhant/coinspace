const express = require('express')
const app = express();
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()

app.get('/:crypto', (req, res) => {
  const crypto = req.params.crypto; // Get the value of the 'crypto' parameter from the URL

  axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.API_KEY
    }
  })
    .then(response => {
      // Handle the API response
      res.json(response.data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.listen(3000, () => {
  console.log(`listening to port 3000`)
})