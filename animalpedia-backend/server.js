const app = require('./app');
const connect = require('./database/database')
const dotenv = require('dotenv');


//του λέω που είναι το αρχείο με τις μεταβλητές που χρησιμοποιώ
dotenv.config({});
const port = process.env.PORT;

connect();

//αφού δημιούργησα τον σερβερ μου τώρα πρέπει να του ορίσω
//σε ποιά θύρα θα ακούει αυτός ο σερβερ
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
}) //δίνω το μήνυμα οτι ο server ακούει σε συγκεκριμένη θύρα
