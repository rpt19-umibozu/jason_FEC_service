const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
// const db = require('../db');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});