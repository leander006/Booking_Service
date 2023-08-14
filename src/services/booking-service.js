const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

const bookingRepository = new BookingRepository();

class BookingService {
  async createBooking(data) {
    try {
      const flightId = data.flightId;
      let getFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const flight = await axios.get(getFlightUrl);
      const flightData = flight.data.data;

      let flightPrice = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "something went wrong in booking Process",
          "Insufficient seats in the flight"
        );
      }

      const totalCosts = data.noOfSeats * flightPrice;

      const bookingPayload = { ...data, totalCost: totalCosts };

      const booking = await bookingRepository.create(bookingPayload);

      let updateFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      await axios.patch(updateFlightUrl, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const updatedBooking = await bookingRepository.update(booking.id, {
        status: "Booked",
      });
      return updatedBooking;
    } catch (error) {
      if (
        (error.name = "ValidationError") ||
        (error.name = "RepositoryError")
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
