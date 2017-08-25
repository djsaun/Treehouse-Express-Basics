const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const name = req.cookies.username;

  if (!name) {
    res.redirect(`/hello`);
  } else {
    res.render(`index`, { name });
  }
});

app.get('/cards', (req, res) => {
  res.locals.prompt = "Who is buried in Grant's tomb?";
  res.locals.hint = "Think about whose tomb it is.";
  res.render(`card`);
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;

  if (!name) {
    res.render(`hello`);
  } else {
    res.redirect(`/`);
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect(`/`);
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
})

app.listen(3000, () => {
  console.log('Restarting application');
});
