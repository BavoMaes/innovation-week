const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const path = require("path");

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/car', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/models/car.js'));
});

app.get('/carType', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/models/carType.js'));
});

app.get('/grid', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/models/grid.js'));
});

app.get('/settings', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/settings.json'));
});

app.get('/particle', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/models/particle.js'));
});

app.get('/exhaust', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/models/exhaust.js'));
});

app.use('/resources', express.static(__dirname + '/public/resources/'));

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/app.js'));
});

app.get('/data', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/script/models/data.js'));
});




let init = () => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
};

init();