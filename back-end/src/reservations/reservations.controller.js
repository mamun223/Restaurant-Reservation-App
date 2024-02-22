const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
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

// async function create(req, res, next) {
//   const newReservation = ({
//     first_name,
//     last_name,
//     mobile_number,
//     reservation_date,
//     reservation_time,
//     people,
//   } = req.body.data);
//   const createdReservation = await service.create(newReservation);
//   res.status(201).json({ data: createdReservation });
// }

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


module.exports = {
  list: asyncErrorBoundary(list),
  reservationForDate: asyncErrorBoundary(reservationForDate),
  create: asyncErrorBoundary(create),
};
