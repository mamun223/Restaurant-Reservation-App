const knex = require("../db/connection");

function list() {
  return knex("tables as t").select("t.*").orderBy("t.table_name");
}

function createTable(newTable) {
  return knex("tables").insert(newTable, "*");
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
    throw new Error("The number of people in the reservation must be less than or equal to the table capacity.");
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
  .first()
}

async function destroy(tableId) {
  const table = await knex("tables")
    .select("reservation_id")
    .where({ table_id: tableId })
    .first();

  if (table.reservation_id === null) {
    throw new Error("Table is already free.");
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
};
