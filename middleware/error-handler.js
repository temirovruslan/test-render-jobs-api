const { StatusCodes } = require('http-status-codes')

// global error handler - catches all errors thrown anywhere in the app
// express knows this is an error handler because it has 4 parameters (err, req, res, next)
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // default to 500 if no status code
    msg: err.message || 'Something went wrong try again later',
  }

  // mongoose validation error - e.g. required field missing or value too short
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }

  // mongodb duplicate key error (code 11000) - e.g. email already exists
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }

  // mongoose cast error - happens when an invalid MongoDB ID format is passed (e.g. /jobs/abc instead of a real ObjectId)
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
