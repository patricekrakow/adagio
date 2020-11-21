'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000
const HOST = '0.0.0.0';
const SERVICE_NAME = "adagio";
const SERVICE_VERSION = "1.0.0";

const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: "Hello from Adagio ;-)",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: process.env.HOSTNAME
    }
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is litening on http://${HOST}:${PORT}`);
});
