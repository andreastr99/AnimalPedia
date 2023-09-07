const express = require('express');
const app = express();
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');


//όποτε έχω μια κλήση API δεν θα το μπλοκάρει και να μπορούμε να το ακούσουμε στο backend
app.use(cors());
//για να μπορούμε να ακούμε σε json format 
app.use(express.json());


//JWT setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        //we make sure that we don't pass data back if we don't need to
        req.user = undefined;
      }
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
})

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
const userRoute = require('./routes/user');

app.use("/api/animal", animalRoute);
app.use("/auth", userRoute);


//if nothing match 
app.use('*', function (req, res) {
  res.status(404).send("Sorry, we can't find that!");
});

module.exports = app;