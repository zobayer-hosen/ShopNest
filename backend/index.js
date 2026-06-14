const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/authroutes');
dotenv.config();

const connectDB = require('./config/bd');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', userRoutes); //Define the route for user authentication
app.use('/api/products', require('./routes/productRoutes')); //Define the route for product management
// app.use('/api/orders', require('./routes/orderRoutes')); //Define the route for order management
// app.use('/api/payments', require('./routes/paymentRoutes')); //Define the route for file uploads
// app.use('/api/analytics', require('./routes/analyticsRoutes.js')); //Define the route for analytics


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

