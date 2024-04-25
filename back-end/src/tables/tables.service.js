const knex = require("../db/connection");

function list() {
  return knex("tables").select("table_name").orderBy("table_name");
}
// async function list() {
//   const tableNames = await knex("tables")
//     .pluck("table_name")
//     .orderBy("table_name");
  
//   return tableNames;
// }

async function createTable(newTable) {
  try {
    const [table] = await knex("tables")
      .insert(newTable)
      .returning(["table_name", "capacity"]);
    return table;
  } catch (error) {
    throw error;
  }
}

async function insertReservationId(table) {
  const { tableId, reservation_id } = table;

  const existingReservation = await knex("tables")
    .select("reservation_id")
    .where("table_id", tableId)
    .first();

  if (existingReservation && existingReservation.reservation_id) {
    throw new Error("Seat is already occupied.");
  }

  const tableCapacity = await knex("tables")
    .select("capacity")
    .where("table_id", tableId)
    .first();

  const reservationPeopleCount = await knex("reservations")
    .select("people")
    .where("reservation_id", reservation_id)
    .first();

  if (reservationPeopleCount.people > tableCapacity.capacity) {
    throw new Error(
      "The number of people in the reservation must be less than or equal to the table capacity."
    );
  }

  return knex("tables")
    .where("table_id", tableId)
    .update("reservation_id", reservation_id)
    .returning("reservation_id");
}

function read(tableId) {
  return knex("tables as t")
    .select("t.table_id")
    .where({ "t.table_id": tableId })
    .first();
}

async function checkIfReservationExists(reservationId) {
  return knex("reservation as r")
    .select("*")
    .where("r.reservation_id", reservationId)
    .first();
}

async function destroy(tableId) {
  const table = await knex("tables")
    .select("reservation_id")
    .where({ table_id: tableId })
    .first();

  if (table.reservation_id === null) {
    throw new Error("not occupied");
  }

  return knex("tables")
    .where({ table_id: tableId })
    .update({ reservation_id: null });
}

module.exports = {
  list,
  createTable,
  insertReservationId,
  destroy,
  read,
  checkIfReservationExists,
};
