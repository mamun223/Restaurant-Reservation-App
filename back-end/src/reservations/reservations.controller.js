const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

async function searchByPhoneNumber(req, res, next) {
  try {
    const { mobile_number } = req.query;
    // console.log("mobile: ", mobile_number[0], "query: ",req.query)
    const reservations = await service.searchByPhoneNumber(mobile_number[0]);
    res.json({ data: reservations });
  } catch (error) {
    next(error);
  }
}

async function reservationExists (req, res, next) {
  const reservationId = req.params.reservationId
  const reservation = await service.read(reservationId)
  
  if (reservation) {
    res.locals.reservationId = reservationId
    return next()
  }
  return next({ status: 404, message: "error: Review cannot be found." })
}

async function list(req, res) {
  res.json({ data: await service.list() })
}


async function reservationForDate(req, res) {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }
  try {
    const reservations = await service.reservationForDate(date);
    res.json({ data: reservations });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const newReservation = ({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
  } = req.body.data);
  try {
      const createdReservation = await service.create(newReservation);
      res.status(201).json({ data: createdReservation });
  } catch (error) {
      next(error);
  }
}

async function update (req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservaion_id: res.locals.reservationId,
  }
  
  
  const data = await service.update(updatedReservation)
  res.json({ data })
}

async function destroy (req, res) {
  await service.destroy(res.locals.reservationId)
  res.sendStatus(204)
}


module.exports = {
  list: asyncErrorBoundary(list),
  reservationForDate: asyncErrorBoundary(reservationForDate),
  create: asyncErrorBoundary(create),
  update: asyncErrorBoundary(update),
  destroy: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  searchByPhoneNumber: asyncErrorBoundary(searchByPhoneNumber),
};
