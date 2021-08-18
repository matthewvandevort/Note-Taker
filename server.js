// Various constants to require certain libraries and store the PORT info.
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middleware for express
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Setting the port.
app.listen(PORT, () => {
    console.log(`The server now on port ${PORT}!`);
});