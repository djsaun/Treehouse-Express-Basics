const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`<h1>This is the homepage</h1>`);
});

app.get('/hello', (req, res) => {
  res.send(`<h1>Hello there</h1>`);
});

app.listen(3000, () => {
  console.log('Restarting application');
});
