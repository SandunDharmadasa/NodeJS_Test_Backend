const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;


app.use(bodyParser.json());


// Connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Connect to the database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// ################## Routes start ####################//

//Product Routes
app.use('/product', require('./routes/productRoutes'));

//Cart Routes
app.use('/cart', require('./routes/cartRouters'));

//Order Routes
app.use('/order', require('./routes/orderRoutes'));

// ################## Routes end ####################//

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Export app
module.exports = app;

// End of file