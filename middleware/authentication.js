const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  // the token must be sent in the Authorization header as: Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  // extract the token part after "Bearer "
  const token = authHeader.split(' ')[1]

  try {
    // verify the token using our secret key - throws an error if expired or tampered
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // attach the user info to req so any route handler can access req.user
    req.user = { userId: payload.userId, name: payload.name }
    next() // move on to the actual route handler
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
