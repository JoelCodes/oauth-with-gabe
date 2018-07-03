
const passport = require('passport');
const express = require('express');
const session = require('express-session');

const app = express();

const User = require('./user-svc');
require('dotenv').config();

const setup = require('./passport-setup');

app.use(express.static('public'));
// console.log('Proc env', process.env);
app.use(session({ secret: process.env.SESSION_SECRET }));
setup(passport, app, User);

app.get('/api/me', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json('Fuck you');
  }
});
app.listen(3005, () => {
  console.log('listening on 3005');
});
