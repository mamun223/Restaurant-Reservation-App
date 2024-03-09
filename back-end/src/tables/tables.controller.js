const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list (req, res) {
    try {
        const tables = await service.list();
        res.json(tables);
      } catch (error) {
        next(error);
      }
}

async function createTable(req, res, next) {
    const newReservedTable = ({
        table_name,
        capacity,
    } = req.body.data);
    try {
        const createdReservedTable = await service.createTable(newReservedTable);
        res.status(201).json({ data: createdReservedTable });
    } catch (error) {
        next(error);
    }
  }

async function insertReservationId(req, res, next) {
  try {
    const { tableId } = req.params;
    const { reservation_id } = req.body.data;

    const updatedReservationId = await service.insertReservationId({
      tableId,
      reservation_id,
    });
    res.status(201).json({ data: updatedReservationId });
  } catch (error) {
    next(error);
  }
}

async function tableExists (req, res, next) {
  const tableId = req.params.tableId
  const table = await service.read(tableId)
  
  if (table) {
    res.locals.tableId = tableId
    return next()
  }
  return next({ status: 404, message: "error: Table cannot be found." })
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
    res.status(404).json({ error: 'table not found.' });
  } 
  res.json({ data: table });
}


  module.exports = {
    list: asyncErrorBoundary(list),
    createTable: asyncErrorBoundary(createTable),
    insertReservationId: asyncErrorBoundary(insertReservationId),
    destroy: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy), asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)]
  };
  