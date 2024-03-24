require('dotenv').config();
const connect = require('./utils/db.js')();
const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
    console.log(`application is running on port ${process.env.PORT}`);
})