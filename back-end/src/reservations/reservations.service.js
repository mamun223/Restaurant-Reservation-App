const knex = require("../db/connection");


function list() {
  return knex("reservations").select("*");
}

function reservationForDate(date) {
  return knex("reservations as r")
    .select("r.*", "r.reservation_date as date")
    .where({ "r.reservation_date": date });
}

function searchByPhoneNumber(mobile_number) {
  console.log("mobile_number: ",mobile_number)
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

function create(newReservation) {
  const { reservation_date, reservation_time } = newReservation;
  if (!isValidReservationDate(reservation_date, reservation_time)) {
    return;
  }
  return knex("reservations").insert(newReservation, "*");
}

function isValidReservationDate(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const reservationDate = new Date(year, month - 1, day, hour, minute);
  reservationDate.setHours(reservationDate.getHours());

  if (reservationDate.getDay() === 2) {
    throw new Error("Reservations on Tuesdays are not allowed.");
  }

  const reservationTime = reservationDate.getHours() * 100 + reservationDate.getMinutes();
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
    throw new Error("Reservations cannot be made in the past.");
  }

  return true;
}

function read(reservationId) {
  return knex("reservations as r")
  .select("r.reservation_id")
  .where({ "r.reservation_id": reservationId })
  .first()
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
  return knex("reservations as r")
    .where({ "r.reservation_id": reservation_id })
    .update({ status: reservationStatus }, ["r.reservation_id"]);
}

function destroy(reservationId) {
  return knex("reservations")
  .where({"reservation_id": reservationId})
  .del()
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
};
