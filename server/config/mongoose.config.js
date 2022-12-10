const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGODB_KEY

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err)); 