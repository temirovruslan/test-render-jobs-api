require('dotenv').config(); // loads .env variables (MONGO_URI, JWT_SECRET, etc.) into process.env
require('express-async-errors'); // automatically catches async errors and passes them to the error handler

// security packages
const helmet = require('helmet'); // sets safe HTTP headers to protect from common attacks
const cors = require('cors'); // allows requests from other domains (e.g. a frontend on a different URL)
const xss = require('xss-clean'); // strips any HTML/script tags from user input to prevent XSS attacks
const rateLimiter = require('express-rate-limit'); // limits how many requests one IP can make

// Swagger - API documentation UI
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); // reads the swagger.yaml file that describes all routes

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication'); // middleware that checks JWT token on protected routes

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handlers (always registered last so they catch errors from all routes above)
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// needed when the app is behind a proxy (like Render, Heroku) so rate limiter gets the real IP
app.set('trust proxy', 1);

// block an IP after 100 requests within 15 minutes
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json()); // parses incoming JSON request bodies so we can access req.body
app.use(helmet());
app.use(cors());
app.use(xss());

// homepage - just a simple HTML link to the docs
app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

// serves the interactive Swagger UI at /api-docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// auth routes are public (no token needed)
app.use('/api/v1/auth', authRouter);
// jobs routes are protected - authenticateUser runs first and checks the JWT token
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// catches any route that doesn't exist
app.use(notFoundMiddleware);
// catches all errors thrown anywhere in the app and sends a proper response
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // connect to MongoDB first, then start the server
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
