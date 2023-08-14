const express = require("express");
const { BookingController } = require("../../controllers/index");

const router = express.Router();

// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();
const bookingController = new BookingController();

router.post("/", bookingController.create);
router.post("/publish", bookingController.sendMessage);

module.exports = router;
