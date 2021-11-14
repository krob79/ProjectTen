'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
//added for project 10
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//middleware for CORS
app.use(cors());

// Set up request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

app.use('/api', routes);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Kyle's Project 10, which uses REST API!",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Test the database connection.
(async () => {
  try {
    await sequelize.authenticate();
    console.log('\x1b[32m%s\x1b[0m', '***********************************************');
    console.log('\x1b[32m%s\x1b[0m',' Connection has been established successfully!');
    console.log('\x1b[32m%s\x1b[0m', '***********************************************');

    //sync the models
    await sequelize.sync();
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', '***********************************************');
    console.log('\x1b[31m%s\x1b[0m',' Unable to connect to the database:', error);
    console.log('\x1b[31m%s\x1b[0m', '***********************************************');
    if(error.name === 'SequelizeValidationError'){
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ' + errors);
    }else{
      throw error;
    }
    
  }
})();

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log('\x1b[32m%s\x1b[0m',`****Express server is listening on port ${server.address().port}`);
});

module.exports = app;