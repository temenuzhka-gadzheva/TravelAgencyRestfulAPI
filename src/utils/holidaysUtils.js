exports.getFilteredHolidays = ({ location, startDate, duration }, holidays) => {
    if (location) {
        holidays = holidays.filter(x =>
            x.location.country.toLowerCase() === location.toLowerCase() ||
            x.location.city.toLowerCase() === location.toLowerCase()
        );
    }

    if (startDate) {
        holidays = holidays.filter(h => new Date(h.startDate) >= new Date(startDate));
    }

    if (duration) {
        holidays = holidays.filter(h => h.duration === parseInt(duration));
    }

    return holidays;
};

exports.getUpdatedBody = (holidays, foundedHolidayIndex, foundedLocation, { title, startDate, duration, price, freeSlots }) => {
    holidays[foundedHolidayIndex].title      = title           || holidays[foundedHolidayIndex].title;
    holidays[foundedHolidayIndex].startDate  = startDate       || holidays[foundedHolidayIndex].startDate;
    holidays[foundedHolidayIndex].duration   = duration        || holidays[foundedHolidayIndex].duration;
    holidays[foundedHolidayIndex].price      = price           || holidays[foundedHolidayIndex].price;
    holidays[foundedHolidayIndex].freeSlots  = freeSlots       || holidays[foundedHolidayIndex].freeSlots;
    holidays[foundedHolidayIndex].location   = foundedLocation || holidays[foundedHolidayIndex].location;

    return holidays[foundedHolidayIndex];
};
