const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.put('/api/stops/add', (req, res) => {
    User.findOneAndUpdate(
      { googleId: req.user.googleId },
      { $push: { stops: { id: req.body.stop, location: req.body.location } } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(400).send('Something went wrong');
        } else if (doc) {
          res.send(doc);
        }
      }
    );
  });

  app.put('/api/stops/remove', (req, res) => {
    User.findOneAndUpdate(
      { googleId: req.user.googleId },
      { $pullAll: { stops:  [{id: req.body.stop, location: req.body.location}] } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(400).send('Something went wrong');
        } else if (doc) {
          res.send(doc);
        }
      }
    );
  });
};
