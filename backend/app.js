var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var todos = [];

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/json', function (req, res) {
  var simpsons = [
    {firstname: "Bart", name: "Simpson", age: 10, sex: 'm'},
    {firstname: "Homer", name: "Simpson", age: 36, sex: 'm'},
    {firstname: "Lisa", name: "Simpson", age: 8, sex: 'w'},
    {firstname: "Marge", name: "Simpson",  age: 34, sex: 'w'},
    {firstname: "Hugo", name: "Simpson", age: 10, sex: 'm'}
  ];

  res.send(JSON.stringify(simpsons));
});
app.get('/todos', function (req, res) {
  res.send(todos);
});
app.post('/todos', function (req, res) {
  todos = req.body;
  console.log(todos);
  res.send(todos);
});

app.listen(3002, function () {
  console.log('Fake Todo Backend listening on port 3002!');
});