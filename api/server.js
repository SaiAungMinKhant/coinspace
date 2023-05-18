const express = require('express')
const app = express();
const request = require('request')
const dotenv = require('dotenv')

dotenv.config()

app.get('/:crypto',(req, res) =>{
  const crypto = req.params.crypto;
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`

  request.get({
    url:url,
    json: true,
    headers:{
      'X-CMC_PRO_API_KEY': process.env.API_KEY
    } 
  },(error, response, data) => {
      if(error){
        return res.send({error:error})
      }

      res.send({
        data: data.data[crypto].quote.USD.price
      })
  })
})

app.listen(3000, () => {
  console.log(`listening to port 3000`)
})