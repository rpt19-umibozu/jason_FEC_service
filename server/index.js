const express = require('express');
const app = express();
const PORT = 3002;
const bodyParser = require('body-parser');
const db = require('../db/index.js').db;
const { getMainRouteString, getMainRouteNum, toggleFavorite, recPhotos } = require('../db/index.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/:id/rec-photos', (req, res) => {
  let id = req.path.split('/')[1];
  if (id === 'rec-photos') {
    id = 10001;
  }
  recPhotos(id)
  .then((results) => {
    results = results[0];
    let keys = Object.keys(results);
    let newKey;
    for (let key of keys) {
      if (results[key] === null) {
        delete results[key];
      } else {
        newKey = key.split('_').shift();
        results[newKey] = results[key];
        delete results[key];
      }
  }
    res.send(results);
  })
  .catch((err) => {
    console.log('error', err);
  });
});

//get product by unique identifier using req object query property
app.get('/listing-info', (req, res) => {
  let id = req.query.listingId;
  if (isNaN(Number(id))) {
    //identifier is name
    getMainRouteString(id)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log('error', err);
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

// reload page with product identifier in url
app.use('/:id', express.static(__dirname + '/../public/index.html'));

app.post('/favorite', (req, res) => {
  let id = req.body.listingId;
  toggleFavorite(id)
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.log('error', err);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;