require("dotenv").config();
const { User } = require("./../models");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// opts.jsonWebTokenOptions = {};

const strategy = new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.findOne({ where: { id: jwt_payload.sub } });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (e) {
    await done(e, false);
  }
});

module.exports = strategy;
