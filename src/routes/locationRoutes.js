const express = require('express');
const router = express.Router();

const locationController = require('../controllers/Location');

// CRUD functionality
router.get('/locations', locationController.getAllLocations);
router.get('/locations/:id', locationController.getLocationById);
router.post('/locations', locationController.createLocation);
router.put('/locations', locationController.updateLocation);
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;
