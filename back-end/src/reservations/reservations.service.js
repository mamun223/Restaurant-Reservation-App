const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function reservationForDate(date) {
  return knex("reservations as r")
    .select("r.*", "r.reservation_date as date")
    .where({ "r.reservation_date": date })
    .orderBy("r.reservation_time");
}

function searchByPhoneNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function createReservedTable(newTable) {
  return knex("reservedTable").insert(newTable, "*");
}

async function create(newReservation) {
  const { reservation_date, reservation_time, people } = newReservation;
  if (!isValidReservationDate(reservation_date, reservation_time, people)) {
    return;
  }
  // return knex("reservations").insert(newReservation, "*");
  const [insertedReservation] = await knex("reservations").insert(
    newReservation,
    "*"
  );
  return insertedReservation;
}

function isValidReservationDate(date, time, people) {

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const reservationDate = new Date(year, month - 1, day, hour, minute);
  reservationDate.setHours(reservationDate.getHours());

  if (reservationDate.getDay() === 2) {
    throw new Error("closed");
  }

  const reservationTime =
    reservationDate.getHours() * 100 + reservationDate.getMinutes();
  const minTime = 1030;
  const maxTime = 2130;
  if (reservationTime < minTime || reservationTime > maxTime) {
    throw new Error("Reservation time should be between 10:30AM and 9:30PM.");
  }

  const today = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour12: false,
  });
  if (reservationDate < new Date(today)) {
    throw new Error("future");
  }

  return true;
}

function read(reservationId) {
  return knex("reservations as r")
    .select("r.*")
    .where({ "r.reservation_id": reservationId })
    .first();
}

async function update(updatedReservationStatus) {
  const { reservation_id, status } = updatedReservationStatus;

  let reservationStatus;
  switch (status) {
    case "booked":
      reservationStatus = "seated";
      break;
    case "seated":
      reservationStatus = "finished";
      break;
    case "finished":
      reservationStatus = "finished";
      break;
    default:
      throw new Error("Invalid reservation status.");
  }
  console.log("reservation_id in update function of service: ", reservation_id)
  return knex("reservations as r")
    .where({ "r.reservation_id": reservation_id })
    .update({ status: reservationStatus }, ["r.reservation_id"]);
}

async function updateReservationStatusToCancelled(updatedReservationStatus) {
  const { reservation_id, status } = updatedReservationStatus;

  let reservationStatus;
  switch (status) {
    case "booked":
      reservationStatus = "cancelled";
      break;
    case "seated":
      reservationStatus = "cancelled";
      break;
    default:
      throw new Error("Invalid reservation status.");
  }
  return knex("reservations as r")
    .where({ "r.reservation_id": reservation_id })
    .update({ status: reservationStatus }, ["r.reservation_id"]);
}

async function updateReservation(reservation) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation;

  if (!isValidReservationDate(reservation_date, reservation_time)) {
    return;
  }

  const updateFields = {
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date: reservation.reservation_date,
    reservation_time: reservation.reservation_time,
    people: reservation.people,
  };

  return knex("reservations as r")
    .where({ "r.reservation_id": reservation_id })
    .update(updateFields)
    .returning("*"); // Return the updated reservation
}

function destroy(reservationId) {
  return knex("reservations").where({ reservation_id: reservationId }).del();
}

function isValidTime(time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

module.exports = {
  list,
  create,
  createReservedTable,
  reservationForDate,
  read,
  update,
  destroy,
  searchByPhoneNumber,
  updateReservationStatusToCancelled,
  updateReservation,
  isValidTime,
};
