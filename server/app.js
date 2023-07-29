const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const dotenv = require('dotenv');
const errors = require("./middleWares/error");
const OwnerRoute = require('./routes/ownerRoute');
const petRoute = require('./routes/petsRoute');

// Load config
dotenv.config({ path: './config/config.env' });

// establish connection to db..
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", OwnerRoute);
app.use("/", petRoute);



app.use(errors.errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
})