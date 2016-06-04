var express = require('express');
var bodyParser = require('body-parser');

var documentationHelper = require('./helpers/documentationHelper');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.redirect('/documentation.json');
});

app.get('/documentation.json', function(req, res) {
    res.json(documentationHelper.documentation);
});

app.get('/:id', function (req, res) {
    documentationHelper.getResult(req.params.id, req.query).then(function(result) {
        res.json(result);
    }).catch(function(err) {
        res.statusCode = 400;
        res.send(err.message);
    });
});

app.listen(3008);