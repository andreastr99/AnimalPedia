const express = require('express');
const app = express(); 
const cors = require('cors');



//όποτε έχω μια κλήση API δεν θα το μπλοκάρει και να μπορούμε να το ακούσουμε στο backend
app.use(cors());
//για να μπορούμε να ακούμε σε json format 
app.use(express.json());


// app.use(express.urlencoded({ extended: false }));


//Define routes
//έτσι κάνω εισαγωγή ένα route που μόλις όρισα
const animalRoute = require('./routes/animal')
const weatherRoute = require('./routes/weather')
const imageRoute = require('./routes/image')
const factRoute = require('./routes/fact')

app.use("/api", animalRoute);
app.use("/api", weatherRoute);
app.use("/api", imageRoute);
app.use("/api", factRoute);

app.use('*', function(req, res){
  res.status(404).send("Sorry, we can't find that!");
});

module.exports = app;