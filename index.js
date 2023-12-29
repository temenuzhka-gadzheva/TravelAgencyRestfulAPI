const express = require('express');
const cors = require('cors');

const app = express();

const locationRoutes = require('./src/routes/locationRoutes');
const holidayRoutes = require('./src/routes/holidayRoutes');

app.use(cors());
app.use(express.json());

// use routes
app.use(locationRoutes);
app.use(holidayRoutes);

const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
