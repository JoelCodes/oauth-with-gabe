const GoogleStrategy = require('passport-google-oauth20').Strategy;

function setup(passport, app, User) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, User.findById(id));
  });
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3005/auth/google/callback',
  }, (accessToken, refreshToken, profile, cb) => {
    console.log('GoogStrat callback', accessToken, refreshToken, profile);
    User.findOrCreateFromGoogle(profile, accessToken, cb);
  }));

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
}

module.exports = setup;
