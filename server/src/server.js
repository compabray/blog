const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

const app = express();
require('dotenv').config();


const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => {
    console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/', blogRoutes);
app.use('/api/admin', adminRoutes);


app.listen(port, () => {
    console.log('Server is running on port', port);
    }
);

