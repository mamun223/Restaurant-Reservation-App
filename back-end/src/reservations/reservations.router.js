/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const cors = require("cors");
const controller = require("./reservations.controller");


router.route("/").get(cors(), controller.reservationForDate).post(controller.create);
router.route("/:reservation_id/status").put(controller.update);
router.route("/:reservationId").delete(controller.destroy);

module.exports = router;
