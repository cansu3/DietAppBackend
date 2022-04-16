const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/DietApplication',)
    .then(() => console.log("Connected to database"))
    .catch(error => console.log("Could not connect to database"));