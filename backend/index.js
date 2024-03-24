require('dotenv').config();
const connect = require('./utils/db.js')();
const express = require('express');
const app = express();
const cors = require('cors');
const orderRouter = require('./routes/order.route')
const bodyParser = require('body-parser')
const { Order } = require("./models/order")

app.use(cors());
app.use(express.json());

app.use('/orders', orderRouter);


app.listen(process.env.PORT, () => {
    console.log(`application is running on port ${process.env.PORT}`);
})