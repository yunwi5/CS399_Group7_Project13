const express = require('express');
const cors = require('cors');
const session = require('express-session');
const keys = require('./keys');
const errorHandler = require('../middleware/errorHandler');

const createApp = () => {
    const app = express();

    console.log('client url:', keys.ClientBaseURL);
    // handle cors issue from client
    app.use(
        cors({
            origin: keys.ClientBaseURL,
            methods: 'GET,POST,PUT,DELETE',
            credentials: true, // IMPORTANT to set to true
        }),
    );

    // Allow express to parse JSON
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Express Session
    app.use(
        session({
            name: 'session',
            secret: 'secretcat',
            resave: false,
            saveUninitialized: true,
        }),
    );

    // Register default error handler
    app.use(errorHandler);

    return app;
};

module.exports = createApp;
