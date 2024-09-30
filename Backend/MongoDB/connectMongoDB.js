const mongoose = require("mongoose");

function connectMongoDb(){
    mongoose.connect("mongodb://localhost:27017/messageDatabase", {
        useNewUrlParser: true, // parse the connection string with latest and most reliable method
        useUnifiedTopology: true // modern connection management system to improve the performance and stability
    })
    .then(() => console.log('Database connected!'))
    .catch((error) => console.log('Connection error:', error));
}

module.exports = connectMongoDb;