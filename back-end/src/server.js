const { PORT = 5001 } = process.env;

const express = require('express');
const app = require("./app");
const knex = require("./db/connection");
const path = require('path');

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });


  // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
