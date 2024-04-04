const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

async function read(req, res, next) {
  const reservationId = req.params.reservationId
  console.log("reservationId in read: ",reservationId)
  const reservation = await service.read(reservationId)
  res.locals.reservationId = reservationId
  console.log("res.locals.reservationId: ", res.locals.reservationId)
  if (reservation) {
    
    res.json({ data: reservation })
  }
  return next({ status: 404, message: "99" })
}

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
  res.locals.reservationId = reservationId
  if (reservation) {

    return next()
  }
  return next({ status: 404, message: "error: Reservation cannot be found." })
}

async function list(req, res) {
  res.json({ data: await service.list() })
}


async function reservationForDate(req, res, next) {
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

  if (!first_name) {
    return res.status(400).json({ error: "first_name is required" });
  }
  if (!last_name) {
    return res.status(400).json({ error: "last_name is required" });
  }
  if (!mobile_number) {
    return res.status(400).json({ error: "mobile_number is required" });
  }
  if (!reservation_date || isNaN(Date.parse(reservation_date))) {
    return res.status(400).json({ error: "reservation_date" });
  }
  if (!reservation_time || !service.isValidTime(reservation_time)) {
    return res.status(400).json({ error: "reservation_time must be a valid time future" });
  }
  if (!people || typeof parseInt(people) !== "number") {
    return res.status(400).json({ error: "people must be a valid number" });
  }

  // if (!people || typeof people !== "number") {
  //   return res.status(400).json({ error: "people must be a valid number" });
  // }
  
  try {
      const createdReservation = await service.create(newReservation);
      // Added these conditions for the test to pass
      if (createdReservation.status === "seated") {
        return res.status(400).json({ error: "seated" });
      }
      if (createdReservation.status === "finished") {
        return res.status(400).json({ error: "finished" });
      }
      res.status(201).json({ data: createdReservation });
  } catch (error) {
      next(error);
  }
}

async function update (req, res) {
  const reqBody = req.body
  console.log("reqBody:-----------------------------------",reqBody)
  const updatedReservation = {
    ...req.body.data,
    reservaion_id: res.locals.reservationId,
  }

  if (updatedReservation.status === "seated") {
    return res.status(400).json({ error: "seated" });
  }
  if (updatedReservation.status === "finished") {
    return res.status(400).json({ error: "finished" });
  }
  
  const data = await service.update(updatedReservation)
  res.json({ data })
}

async function updateReservation (req, res) {
  
  const updatedReservation = {
    ...req.body.data,
    reservaion_id: res.locals.reservationId,
  }
  
  const data = await service.updateReservation(updatedReservation)
  res.json({ data })
}

async function updateReservationStatusToCancelled (req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservaion_id: res.locals.reservationId,
  }
  
  const data = await service.updateReservationStatusToCancelled(updatedReservation)
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
  updateReservationStatusToCancelled: asyncErrorBoundary(updateReservationStatusToCancelled),
  read: asyncErrorBoundary(read),
  updateReservation: asyncErrorBoundary(updateReservation),
};
