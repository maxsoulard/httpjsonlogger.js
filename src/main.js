const bodyParser = require('body-parser');
const express = require('express');
const handler = require('./handler');
const app = express();
const conf = require('../conf');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get(conf.routeFilter, handler.get);
app.post(conf.routeFilter, handler.post);
app.put(conf.routeFilter, handler.put);
/*app.delete(conf.routeFilter, handler.delete);*/

app.listen('8888');