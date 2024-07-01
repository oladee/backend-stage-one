var express = require('express');
const axios = require('axios');
var router = express.Router();

require('dotenv').config()

router.get('/',(req,res,next)=>{
  res.send('done')
})

router.get('/api/hello', async function(req, res, next){
  const username = req.query.visitor_name
  const secret = process.env.WEATHER_API_KEY
  const userIp = req.socket.remoteAddress
  try {
    const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${secret}&q=${userIp}`)

  const location = result.data.location.name
  const temp = Math.floor(result.data.current.temp_c)

  res.send({
    client_ip : userIp,
    location ,
    greeting : `Hello, ${username}!, the temperature is ${temp} degrees Celcius in ${location} `
  });
    
  } catch (error) {
    console.log(error)
  }

  

});

module.exports = router;
