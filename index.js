const express = require("express");
const xmlparser = require('express-xml-bodyparser');
const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser');
// const morgan = require("morgan");
// const https = require('https')
// const path = require('path')
const cors = require('cors')
const fs = require('fs');
const app = express();


// // app.use(morgan("dev"));
// app.use(bodyParser.json());
app.use(cors());
// app.use(cookieParser())
app.use(xmlparser());


// var options = {
//   key: fs.readFileSync('./ssl/privatekey.pem'),
//   cert: fs.readFileSync('./ssl/certificate.pem'),
// };


dotenv.config();




//const port = 8080;

//app.listen(port, () => { console.log(`The Node JS server is running on port ${port}`) })


app.post('/payload', xmlparser({trim: false, explicitArray: false}), (req, res) => {

  let body = req.rawBody;

  // require('./public/ca.pem')
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://acs2test.quipugmbh.com:6443/Exec',  
    'headers': {
      'Content-Type': 'application/xml'
    },
    key: fs.readFileSync('./public/key.pem'),
    cert: fs.readFileSync('./public/cert.pem'),

    // This is necessary only if using client certificate authentication.
    requestCert: true,

    // This is necessary only if the client uses a self-signed certificate.
    ca: [fs.readFileSync('./public/ca.pem')], 

    body: body

  };
  request(options, function (error, response) {
    // if (error) throw new Error(error);


    console.log(response.body);
    res.send(response.body) 
  });   

});

const port =process.env.PORT || 8080;  

app.listen(port, () => { console.log(`The Node JS server is running on port ${port}`) })  


