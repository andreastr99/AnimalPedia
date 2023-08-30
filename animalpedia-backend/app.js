const express = require('express');
const app = express(); 
const cors = require('cors');



//όποτε έχω μια κλήση API δεν θα το μπλοκάρει και να μπορούμε να το ακούσουμε στο backend
app.use(cors());
//για να μπορούμε να ακούμε σε json format 
app.use(express.json());

//Define routes
//έτσι κάνω εισαγωγή ένα route που μόλις όρισα
const animalAPIRoute = require('./routes/animalAPI')
const weatherRoute = require('./routes/weather')
const imageRoute = require('./routes/image')
const factRoute = require('./routes/fact')

app.use("/api", animalAPIRoute);
app.use("/api", weatherRoute);
app.use("/api", imageRoute);
app.use("/api", factRoute);

//mongoDB routes
const animalRoute = require('./routes/animal')

app.use("/api/animal", animalRoute);

app.use('*', function(req, res){
  res.status(404).send("Sorry, we can't find that!");
});

module.exports = app;