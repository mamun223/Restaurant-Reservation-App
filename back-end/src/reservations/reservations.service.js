const knex = require("../db/connection");

const tableName = "reservations";

function list() {
  return knex("reservations as r").select("r.reservation_date");
}

function reservationForDate(date) {
  return knex("reservations as r")
    .select("reservation_date")
    .where({ "r.reservation_date": date });
}

function create(newReservation) {
  const { reservation_date, reservation_time } = newReservation;
  if (!isValidReservationDate(reservation_date, reservation_time)) {
    throw new Error(
      "Invalid reservation date/time. Reservations cannot be made on Tuesdays or in the past. \n Reservation time should be between 10:30AM and 9:30PM "
    );
  }
  return knex(tableName).insert(newReservation, "*");
}

function isValidReservationDate(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const reservationDate = new Date(year, month - 1, day, hour, minute);
  reservationDate.setHours(reservationDate.getHours());

  const today = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour12: false,
  });

  if (reservationDate.getDay() === 2) return false;

  const reservationTime =
    reservationDate.getHours() * 100 + reservationDate.getMinutes();
  const minTime = 1030; 
  const maxTime = 2130;
  if (reservationTime < minTime || reservationTime > maxTime) return false;

  return reservationDate >= new Date(today);
}

module.exports = {
  list,
  create,
  reservationForDate,
};
