const dotenv = require('dotenv');

//του λέω που είναι το αρχείο με τις μεταβλητές που χρησιμοποιώ
dotenv.config({});

module.exports = uri = 
    `mongodb+srv://andreastr99:${process.env.DB_PASSWORD}@animals.18ozjsl.mongodb.net/?retryWrites=true&w=majority`;