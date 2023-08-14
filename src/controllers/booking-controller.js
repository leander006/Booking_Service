const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
class BookingController {
  async sendMessage(req, res) {
    const channel = await createChannel();
    publishMessage(
      channel,
      REMINDER_BINDING_KEY,
      JSON.stringify({ message: "success" })
    );
    return res.status(200).json({ message: "Successfully published message" });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      //     console.log("response ", response);
      return res.status(StatusCodes.OK).json({
        message: "Successfully created a booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
