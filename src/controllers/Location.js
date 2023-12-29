const fs = require('fs');
const path = require('path');
const Location = require('../models/Location');

const dataFilePath = path.join(__dirname, '..', 'database', 'data.json');

function readData() {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

exports.getAllLocations = (req, res) => {
  const data = readData();
  res.json(data.locations);
};

exports.getLocationById = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const location = data.locations.find(l => l.id === id);

  if (location) {
    res.json(location);
  } else {
    res.status(404).send('Location not found');
  }
};

exports.addLocation = (req, res) => {
  const data = readData();
  const { street, number, city, country } = req.body;
  const newLocation = new Location(data.locations.length + 1, street, number, city, country);
  data.locations.push(newLocation);
  writeData(data);
  res.status(201).json(newLocation);
};

exports.updateLocation = (req, res) => {
  const data = readData();
  const { id, street, number, city, country } = req.body;
  const locationIndex = data.locations.findIndex(l => l.id === parseInt(id));

  if (locationIndex > -1) {
    data.locations[locationIndex] = new Location(id, street, number, city, country);
    writeData(data);
    res.json(data.locations[locationIndex]);
  } else {
    res.status(404).send('Location not found');
  }
};

exports.deleteLocation = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const locationIndex = data.locations.findIndex(l => l.id === id);

  if (locationIndex > -1) {
    data.locations.splice(locationIndex, 1);
    writeData(data);
    res.status(200).send('Location deleted');
  } else {
    res.status(404).send('Location not found');
  }
};
