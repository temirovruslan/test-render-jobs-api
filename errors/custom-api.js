// base error class for all custom errors in this app
// extends the built-in Error class so we can throw it like a normal error
// all other custom errors (BadRequest, NotFound, etc.) extend this class
class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = CustomAPIError
