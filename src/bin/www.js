"use strict";
const port = 3000;
const hostname = 'localhost';
const app = require('../app');

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});
