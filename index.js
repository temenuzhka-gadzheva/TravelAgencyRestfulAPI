const express = require('express');
const cors = require('cors');

const app = express();

const locationRoutes = require('./src/routes/locationRoutes');

app.use(cors());
app.use(express.json());

// use routes
app.use(locationRoutes);

const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
