const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  try {
    const tables = await service.list();
    res.json(tables);
  } catch (error) {
    next(error);
  }
}

async function createTable(req, res, next) {
  const newReservedTable = ({ table_name, capacity } = req.body.data);

  if (!table_name || table_name.trim() === "") {
    return res.status(400).json({ error: "table_name" });
  }
  if (table_name.length === 1) {
    return res
      .status(400)
      .json({ error: "table_name" });
  }
  if (typeof capacity !== "number" || capacity === 0) {
    return res
      .status(400)
      .json({ error: "capacity" });
  }

  try {
    const createdReservedTable = await service.createTable(newReservedTable);
    res.status(201).json({ data: createdReservedTable });
  } catch (error) {
    next(error);
  }
}

// async function insertReservationId(req, res, next) {
//   try {
//     const { tableId } = req.params;
//     const { reservation_id } = req.body.data;

//     const updatedReservationId = await service.insertReservationId({
//       tableId,
//       reservation_id,
//     });
//     res.status(201).json({ data: updatedReservationId });
//   } catch (error) {
//     next(error);
//   }
// }

async function insertReservationId(req, res, next) {
  try {
    const { tableId } = req.params;
    const { reservation_id } = req.body.data;

    // Check if data is missing
    if (!reservation_id) {
      return res.status(400).json({ error: "Reservation ID is missing." });
    }

    // Check if the reservation_id exists
    const existingReservation = await knex("tables")
      .select("reservation_id")
      .where("table_id", tableId)
      .first();

    if (!existingReservation || !existingReservation.reservation_id) {
      return res.status(404).json({ error: "Reservation ID does not exist." });
    }

    // Check if table has sufficient capacity
    const tableCapacity = await knex("tables")
      .select("capacity")
      .where("table_id", tableId)
      .first();

    if (!tableCapacity || tableCapacity.capacity < 1) {
      return res.status(400).json({ error: "Table does not have sufficient capacity." });
    }

    // Check if table is occupied
    if (existingReservation.reservation_id !== null) {
      return res.status(400).json({ error: "Seat is already occupied." });
    }

    // Insert reservation_id into the table
    await knex("tables")
      .where("table_id", tableId)
      .update({ reservation_id });

    // Return success response if everything is okay
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}


async function tableExists(req, res, next) {
  const tableId = req.params.tableId;
  const table = await service.read(tableId);

  if (table) {
    res.locals.tableId = tableId;
    return next();
  }
  return next({ status: 404, message: "error: Table cannot be found." });
}

// async function destroy (req, res) {
//   await service.destroy(res.locals.tableId)
//   res.sendStatus(204)
// }

async function destroy(req, res) {
  try {
    await service.destroy(res.locals.tableId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function read(req, res) {
  const table = await service.read(Number(res.locals.movieId));

  if (!table) {
    res.status(404).json({ error: "table not found." });
  }
  res.json({ data: table });
}

module.exports = {
  list: asyncErrorBoundary(list),
  createTable: asyncErrorBoundary(createTable),
  insertReservationId: asyncErrorBoundary(insertReservationId),
  destroy: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(destroy),
    asyncErrorBoundary(list),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
