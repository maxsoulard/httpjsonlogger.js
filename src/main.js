const bodyParser = require('body-parser');
const express = require('express');
const handler = require('./handler');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('*', handler.get);
app.post('*', handler.post);
app.put('*', handler.put);
app.delete('*', handler.delete);

app.listen('8888');