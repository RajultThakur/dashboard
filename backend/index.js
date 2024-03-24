require('dotenv').config();
const connect = require('./utils/db.js')();
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user.route');
const orderRouter = require('./routes/order.route')

app.use(cors());
app.use(express.json());

app.use('/orders', orderRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`application is running on port ${process.env.PORT}`);
})