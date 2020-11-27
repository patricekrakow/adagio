'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const short = require('short-uuid');

const PORT = 3000
const HOST = '0.0.0.0';
const SERVICE_NAME = "adagio";
const SERVICE_VERSION = "1.0.0";

const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
//
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

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

const items = [];
const itemsIndexedById = [];

// Create a new `item`:
app.post('/items', (req, res) => {
  const id = short.uuid();
  const name = req.body.name;
  const item ={
    id: id,
    name: name,
    status: "created"
  };
  items.push(item);
  itemsIndexedById.push(item.id);
  res.status(201).json(item);
});

// List all `items`:
app.get('/items', (req, res) => {
  if (items.length > 0) {
    res.status(200).json(items);
  } else {
    res.status(404).end();
  }
});

// Get the details of a specific `item`:
app.get('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const itemPosition = itemsIndexedById.lastIndexOf(itemId);
  if (itemPosition > -1) {
    res.status(200).json(items[itemPosition]);
  }
  else
  {
    res.status(404).end();
  }
});

// Update a specific `item` using partial representation:
app.patch('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const itemPosition = itemsIndexedById.lastIndexOf(itemId);
  const status = req.body.status;
  if (itemPosition > -1) {
    const item = items[itemPosition];
    item.status = status;
    res.status(200).json(item);
  }
  else
  {
    res.status(404).end();
  }
});

// Delete a specific `item`:
app.delete('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const itemPosition = itemsIndexedById.lastIndexOf(itemId);
  if (itemPosition > -1) {
    items.splice(itemPosition, 1);
    itemsIndexedById.splice(itemPosition, 1);
    res.status(204).end();
  }
  else
  {
    res.status(404).end();
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is litening on http://${HOST}:${PORT}`);
});
