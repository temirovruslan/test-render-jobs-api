const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// used when a resource (job, user) doesn't exist - responds with 404
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND; // 404
  }
}

module.exports = NotFoundError;
