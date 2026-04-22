const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// used when the client sends invalid or missing data - responds with 400
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST; // 400
  }
}

module.exports = BadRequestError;
