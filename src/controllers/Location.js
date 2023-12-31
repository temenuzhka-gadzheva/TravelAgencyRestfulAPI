const Location = require('../models/Location');
const { readData, writeData } = require('../utils/utils');

// get all locations
exports.getAllLocations = (req, res) => {
  let data = readData();
  res.json(data.locations);
};

// get location by id 
exports.getLocationById = (req, res) => {
  let data     = readData();
  let id       = parseInt(req.params.id);
  let location = data.locations.find(x => x.id === id);

  location ? res.json(location) : res.status(404).send(`Location with ID: ${id} not found`);
};

// create location
exports.createLocation = (req, res) => {
  let data = readData();
  let { street, number, city, country } = req.body;

  let createLocation = new Location(data.locations.length + 1, street, number, city, country);

  data.locations.push(createLocation);
  writeData(data);
  res.status(201).json(createLocation);
};

// update location
exports.updateLocation = (req, res) => {
  let data = readData();
  let { id, street, number, city, country } = req.body;
  
  let locationIndex = data.locations.findIndex(x => x.id === parseInt(id));

  if (locationIndex > -1) {
    data.locations[locationIndex] = new Location(id, street, number, city, country);
  
    writeData(data);
    res.json(data.locations[locationIndex]);
  } else {
    res.status(404).send(`Location with ID: ${locationIndex} not found`);
  }
};

// delete location
exports.deleteLocation = (req, res) => {
  let data          = readData();
  let id            = parseInt(req.params.id);
  let locationIndex = data.locations.findIndex(x => x.id === id);

  if (locationIndex > -1) {
    data.locations.splice(locationIndex, 1);
    writeData(data);
    res.status(200).send(`Location with ID: ${locationIndex} deleted`);
  } else {
    res.status(404).send(`Location with ID: ${locationIndex} not found`);
  }
};
