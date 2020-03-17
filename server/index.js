const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const db = require('../db/index.js').db;
const getMainRouteString = require('../db/index.js').getMainRouteString;
const getMainRouteNum = require('../db/index.js').getMainRouteNum;


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//get product by unique identifier using req object params
app.get('/:id', (req, res) => {
  let id = req.params.id;
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
      console.log('err', err);
    });
  }
});