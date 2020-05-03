const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] })
);
app.use(passport.initialize());
app.use(passport.session());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//ROUTES
require('./routes/authRoutes')(app);
require('./routes/metrotransitRoutes')(app);

//CONDITIONS IF DEPLOYED TO PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//SERVER RUNNING
const port = process.env.PORT || 2020;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
