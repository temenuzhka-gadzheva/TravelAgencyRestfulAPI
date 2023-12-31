const fs = require('fs');
const path = require('path');
const Reservation = require('../models/Reservation');

const dataFilePath = path.join(__dirname, '..', 'database', 'data.json');

function readData() {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

exports.getAllReservations = (req, res) => {
    const data = readData();
    res.json(data.reservations);
};

exports.getReservationById = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservation = data.reservations.find(r => r.id === id);

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).send('Reservation not found');
    }
};

exports.createReservation = (req, res) => {
    let data = readData();
    const { contactName, phoneNumber, holiday } = req.body;

    const holidayObject = data.holidays.find(x => x.id === parseInt(holiday));

    if (!holidayObject) {
        return res.status(404).send(`Holiday not found for ID: ${holidayObject.id}`);
    }

    const newReservation = new Reservation(
        data.reservations.length + 1,
        contactName,
        phoneNumber,
        holidayObject
    );

    data.reservations.push(newReservation);
    writeData(data);
    res.status(201).json(newReservation);
};

exports.updateReservation = (req, res) => {
    let data = readData();
    const { id, contactName, phoneNumber, holiday } = req.body;

    // Find the index of the reservation to update
    const reservationIndex = data.reservations.findIndex(r => r.id === parseInt(id));
    if (reservationIndex === -1) {
        return res.status(404).send('Reservation not found');
    }

    // Optionally update the holiday object if the holiday ID is provided
    let holidayObject = data.reservations[reservationIndex].holiday;
    if (holiday) {
        holidayObject = data.holidays.find(x => x.id === parseInt(holiday));
        if (!holidayObject) {
            return res.status(404).send(`Holiday not found for ID: ${holiday}`);
        }
    }

    // Update the reservation details
    data.reservations[reservationIndex].contactName = contactName || data.reservations[reservationIndex].contactName;
    data.reservations[reservationIndex].phoneNumber = phoneNumber || data.reservations[reservationIndex].phoneNumber;
    data.reservations[reservationIndex].holiday = holidayObject;

    writeData(data);
    res.json(data.reservations[reservationIndex]);
};

exports.findReservationByPhoneNumber = (req, res) => {
    const { phoneNumber } = req.query;
    const data = readData();
    const reservation = data.reservations.find(r => r.phoneNumber === phoneNumber);

    if (reservation) {
        res.json(reservation);
    } else {
        res.status(404).send('Reservation not found');
    }
};

exports.deleteReservation = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservationIndex = data.reservations.findIndex(r => r.id === id);

    if (reservationIndex > -1) {
        data.reservations.splice(reservationIndex, 1); // Remove the reservation
        writeData(data);
        res.status(200).send('Reservation deleted');
    } else {
        res.status(404).send('Reservation not found');
    }
};
