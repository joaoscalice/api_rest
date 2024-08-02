var express = require('express');
var path = require('path');

var rotaIndex = require('./routes/index')
var rotaCliente = require("./routes/client")
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', rotaIndex)
app.use("/api/client", rotaCliente)

module.exports = app;