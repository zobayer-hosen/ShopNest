const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const connectDB = require('./config/bd');
connectDB();

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('api/auth',userRoutes);//Define the route for user authentication


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

