const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({ data: await service.list() })
}

async function create (req, res) {
  const data = await service.create(req.body.data);
  response.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create,
};
