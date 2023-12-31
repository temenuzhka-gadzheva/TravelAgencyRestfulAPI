exports.getUpdatedBody = (reservations, foundedReservationIndex, holidayObject, { contactName, phoneNumber}) => {
   
    reservations[foundedReservationIndex].contactName = contactName || data.reservations[foundedReservationIndex].contactName;
    reservations[foundedReservationIndex].phoneNumber = phoneNumber || data.reservations[foundedReservationIndex].phoneNumber;
    reservations[foundedReservationIndex].holiday     = holidayObject;

    return reservations[foundedReservationIndex];
};