// single entry point for all error classes
// instead of importing from 4 different files, any file can just do:
// const { BadRequestError, NotFoundError, ... } = require('../errors')
const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
