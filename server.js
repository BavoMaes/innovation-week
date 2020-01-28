const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const path = require("path");

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/Car', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/Models/Car.js'));
});

app.get('/grid', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/script/Models/grid.js'));
});

app.use('/carObject', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/resources/car.obj'));
});

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/app.js'));
});

let init = () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
};

init();