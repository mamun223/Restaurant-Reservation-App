/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const cors = require("cors");

router.route("/").get(cors(), controller.list).post(controller.createTable)
router.route("/:tableId").put(controller.insertReservationId)
router.route("/:tableId/seat").delete(controller.destroy)

module.exports = router;