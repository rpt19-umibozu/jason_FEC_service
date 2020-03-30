const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const db = require('../db/index.js').db;
const getMainRouteString = require('../db/index.js').getMainRouteString;
const getMainRouteNum = require('../db/index.js').getMainRouteNum;
const fullPath = '/Users/jasonjacob/Desktop/seniorProjects/jason_FEC_service/client/dist/index.html';


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//get product by unique identifier using req object query property.
app.get('/listing-info', (req, res) => {
  let id = req.query.listingId;
  if (isNaN(Number(id))) {
    //identifier is name
    getMainRouteString(id)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log('err', err);
    });
  } else {
    //identifier is lisitng_id
    id = Number(id);
    getMainRouteNum(id)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log('error', err);
    });
  }
});

//reload page with product identifier in url
app.get('/:id', (req, res) => {
  res.sendFile(fullPath);
});

app.post('/favorite', (req, res) => {

});