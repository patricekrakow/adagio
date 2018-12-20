'use strict';
const express = require('express');
const PORT = 8080
const HOST = '0.0.0.0';
const SERVICE_NAME = "service1";
const SERVICE_VERSION = "1.0.0";
const app = express();
app.get('/resource-a', (req, res) => {
  res.send({
    message: "Hello from resource-a",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: process.env.HOSTNAME
    }
  });
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
