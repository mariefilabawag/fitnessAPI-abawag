const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://fitnessapi-abawag-1.onrender.com"
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.get('/', (req, res) => {
    res.send('Fitness Tracker API is running!');
});

const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
app.use(userRoutes);
app.use(workoutRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, mongoose };
