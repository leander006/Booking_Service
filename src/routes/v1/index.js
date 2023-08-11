const express = require("express");

const { BookingController } = require("../../controllers/index");
const router = express.Router();

router.post("/", BookingController.create);

module.exports = router;
