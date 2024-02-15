const knex = require("../db/connection");

const tableName = "reservations";

function list () {
    return knex("reservations as r")
    .select("r.reservation_date")
}

function reservationForDate (date) {
  return knex("reservations as r")
    .select("*")
    .where({ "r.reservation_date": date })
    .then((arr) => {
      const uniqueDates = Array.from(arr.map(JSON.stringify), JSON.parse);
      return uniqueDates;
    });
}

function create(newReservation) {
  return knex(tableName)
    .insert(newReservation, "*")
    // .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    list,
  create,
};
