const Reservation = require('../models/Reservation');
const { readData, writeData } = require('../utils/utils');
const { getUpdatedBody } = require('../utils/reservationUtils');

// get all reservations
exports.getAllReservations = (req, res) => {
    let data = readData();
    res.json(data.reservations);
};

// get reservation by id 
exports.getReservationById = (req, res) => {
    let data        = readData();
    let id          = parseInt(req.params.id);
    let reservation = data.reservations.find(x => x.id === id);

    reservation ? res.json(reservation) : res.status(404).send(`Reservation with ID: ${id} not found`);
};

// create reservation
exports.createReservation = (req, res) => {
    let data = readData();
    let { contactName, phoneNumber, holiday } = req.body;

    let holidayObject = data.holidays.find(x => x.id === parseInt(holiday));
    if (!holidayObject) {
        return res.status(404).send(`Holiday with ID: ${holidayObject.id} not found`);
    }

    let createReservation = new Reservation(data.reservations.length + 1, contactName, phoneNumber, holidayObject);

    data.reservations.push(createReservation);
    writeData(data);
    res.status(201).json(createReservation);
};

// update reservation
exports.updateReservation = (req, res) => {
    let data = readData();
    let { id, contactName, phoneNumber, holiday } = req.body;

    let foundedReservationIndex = data.reservations.findIndex(r => r.id === parseInt(id));
    if (foundedReservationIndex === -1) {
        return res.status(404).send(`Reservation with ID: ${foundedReservationIndex} not found`);
    }

    let holidayObject = data.reservations[foundedReservationIndex].holiday;
    
    if (holiday) {
        holidayObject = data.holidays.find(x => x.id === parseInt(holiday));
        if (!holidayObject) {
            return res.status(404).send(`Holiday with ID: ${holiday} not found`);
        }
    }

    data.reservations[foundedReservationIndex] = getUpdatedBody(data.reservations, foundedReservationIndex, holidayObject, { contactName, phoneNumber});

    writeData(data);
    res.json(data.reservations[foundedReservationIndex]);
};

// find reservation bu phone number
exports.findReservationByPhoneNumber = (req, res) => {
    let phoneNumber = req.query;
    let data        = readData();
    let reservation = data.reservations.find(x => x.phoneNumber === phoneNumber);

    reservation ? res.json(reservation) : res.status(404).send(`Reservation with this phone number: ${phoneNumber} not found`);
};

// delete reservation
exports.deleteReservation = (req, res) => {
    let data             = readData();
    let id               = parseInt(req.params.id);
    let reservationIndex = data.reservations.findIndex(x => x.id === id);
    
    if (reservationIndex > -1) {
      data.reservations.splice(reservationIndex, 1);
      writeData(data);
      res.status(200).send(`Reservation with ID: ${reservationIndex} deleted`);
    } else {
      res.status(404).send(`Reservation with ID: ${reservationIndex} not found`);
    }
};
