const fs = require('fs');
const path = require('path');
const Holiday = require('../models/Holiday');

const dataFilePath = path.join(__dirname, '..', 'database', 'data.json');

function readData() {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

 // add filter to can find holiday by fields 
exports.getAllHolidays = (req, res) => {
    const { location, startDate, duration } = req.query;
    const data = readData();

    let filteredHolidays = data.holidays;

    // Filter by country or city in location
    if (location) {
        filteredHolidays = filteredHolidays.filter(h =>
            h.location.country.toLowerCase() === location.toLowerCase() || 
            h.location.city.toLowerCase() === location.toLowerCase()
        );
    }

    // Filter by start date
    if (startDate) {
        const startDateObject = new Date(startDate);
        filteredHolidays = filteredHolidays.filter(h => new Date(h.startDate) >= startDateObject);
    }

    // Filter by duration
    if (duration) {
        const durationNumber = parseInt(duration);
        filteredHolidays = filteredHolidays.filter(h => h.duration === durationNumber);
    }

    res.json(filteredHolidays);
};

exports.getHolidayById = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const holiday = data.holidays.find(l => l.id === id);

    if (holiday) {
        res.json(holiday);
    } else {
        res.status(404).send(`Holiday not found for id ${id}`);
    }
};

exports.addHoliday = (req, res) => {
    const data = readData();
    const { title, startDate, duration, price, freeSlots, location } = req.body;

    const locationObject = data.locations.find(x => x.id === parseInt(location));

    if (!locationObject) {
        return res.status(404).send(`Location not found for ID: ${locationObject.id}`);
    }

    const newHoliday = new Holiday(data.holidays.length + 1, title, startDate, duration, price, freeSlots, locationObject);

    data.holidays.push(newHoliday);
    writeData(data);
    res.status(201).json(newHoliday);
};

exports.updateHoliday = (req, res) => {
    const data = readData();
    const { id, title, startDate, duration, price, freeSlots, location } = req.body;

    const holidayIndex = data.holidays.findIndex(h => h.id === parseInt(id));

    if (holidayIndex === -1) {
        return res.status(404).send('Holiday not found');
    }

    const locationObject = data.locations.find(l => l.id === parseInt(location));
    if (!locationObject) {
        return res.status(404).send(`Location not found for ID: ${location}`);
    }

    data.holidays[holidayIndex].title = title || data.holidays[holidayIndex].title;
    data.holidays[holidayIndex].startDate = startDate || data.holidays[holidayIndex].startDate;
    data.holidays[holidayIndex].duration = duration || data.holidays[holidayIndex].duration;
    data.holidays[holidayIndex].price = price || data.holidays[holidayIndex].price;
    data.holidays[holidayIndex].freeSlots = freeSlots || data.holidays[holidayIndex].freeSlots;
    data.holidays[holidayIndex].location = locationObject || data.holidays[holidayIndex].location;

    writeData(data);
    res.json(data.holidays[holidayIndex]);
};

exports.deleteHoliday = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const holidayIndex = data.holidays.findIndex(h => h.id === id);

    if (holidayIndex > -1) {
        data.holidays = data.holidays.filter(h => h.id !== id);
        writeData(data);
        res.status(200).send('Holiday deleted');
    } else {
        res.status(404).send('Holiday not found');
    }
};
