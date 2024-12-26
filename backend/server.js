const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

//middlewares
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.send('This is a Wotkout Planner App');
})

app.use('/workouts', workoutRoutes);


//connect with mongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
})

//listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})