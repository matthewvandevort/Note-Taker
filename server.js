const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/api');
const hlml = require('./routes/html');


const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
}));