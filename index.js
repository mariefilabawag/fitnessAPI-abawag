const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());

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