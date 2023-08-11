const { StatusCodes } = require("http-status-codes");

class ServiceErrors extends Error {
  constructor(
    message = "Something went wrong",
    explanation = "Service layer error",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.message = message;
    this.explanation = explanation;
    this.name = "ServiceError";
    this.statusCode = statusCode;
  }
}

module.exports = ServiceErrors;
