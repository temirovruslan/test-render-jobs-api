const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// used when a user is not logged in or sends an invalid/expired token - responds with 401
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED; // 401
  }
}

module.exports = UnauthenticatedError;
