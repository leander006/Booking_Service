const express = require("express");
const { BookingController } = require("../../controllers/index");

const router = express.Router();

// const { createChannel } = require("../../utils/messageQueue");

// const channel = await createChannel();
const bookingController = new BookingController();

router.get("/info", (req, res) => {
  return res.json({ message: "Response from api routes" });
});
router.post("/", bookingController.create);
router.post("/publish", bookingController.sendMessage);

module.exports = router;
