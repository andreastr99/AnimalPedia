const mongoose = require('mongoose');
const uri = require('../atlas_uri')


async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error)
    }
}

//έτσι κάνω export κατευθείαν το αποτέλεσμα της συνάρτησης
// module.exports = connect();

//έτσι κάνω export την συνάρτηση 
module.exports = connect;