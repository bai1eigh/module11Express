//setting up dependencies ('outside code that the application depends on')
//nodejs and its framworks || routes
const express = require('express');
const path = require('path');
const api = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes');

//setting up server
const app = express();
const PORT = process.env.PORT || 3001;

//middleware lets static files process
app.use(express.static('./develop/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/', htmlRoutes);

//console.log to see if the server is running locally
console.log('program started')

//listening to server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
