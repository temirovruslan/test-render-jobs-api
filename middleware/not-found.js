// catches any request to a route that doesn't exist in the app
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound
