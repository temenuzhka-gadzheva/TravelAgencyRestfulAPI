const express = require('express');
const cors    = require('cors');
const app     = express();
const port    = 8080;

app.use(cors());
app.use(express.json());

// define routes
const locationRoutes     = require('./src/routes/locationRoutes');
const holidayRoutes      = require('./src/routes/holidayRoutes');
const reservationRoutes  = require('./src/routes/reservationRoutes');

// use routes
app.use(locationRoutes);
app.use(holidayRoutes);
app.use(reservationRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
