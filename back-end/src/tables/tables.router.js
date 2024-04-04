/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const cors = require("cors");

router.route("/").post(controller.createTable).get(cors(), controller.list)
router.route("/:tableId").put(controller.insertReservationId)
router.route("/:tableId/seat").put(controller.insertReservationId).delete(controller.destroy)

module.exports = router;