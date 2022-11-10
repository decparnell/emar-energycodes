const SamlStrategy = require("passport-saml").Strategy;

module.exports = function (passport, config) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  /* passport.use(
    new SamlStrategy(config.passport.saml, function (profile, done) {
      return done(null, {
        id: profile.uid,
        email: profile.email,
        displayName: profile.cn,
        firstName: profile.givenName,
        lastName: profile.sn,
      });
    })
  ); */
  passport.use(
    new SamlStrategy(config.passport.saml, function (profile, done) {
      return done(null, {
        id: profile.NameID,
        email: profile.email,
        displayName: profile.DisplayName,
        firstName: profile.GivenName,
        lastName: profile.Surname,
      });
    })
  );
};
