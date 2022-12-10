//imports
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');

//express
const app = express();
const port = 8000;

//express app
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongoose DB connection
require('./server/config/mongoose.config');

//routes (/server/routes/data-routes)
require('./server/routes/user-routes')(app);

//express REST API port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})