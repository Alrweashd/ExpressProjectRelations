const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
//to login in and verify the username and password if they are eqaul to crypted one
exports.localStrategy = new LocalStrategy(
  { usernameField: "userOrEmail" }, //optional but the default is username
  async (userOrEmail, password, done) => {
    try {
      const user = await User.findOne({
        $or: [
          { username: userOrEmail.toUpperCase() },
          { email: userOrEmail.toUpperCase() },
        ],
      });
      if (!user) {
        //null for the error, meaning there is no error
        return done(null, false);
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  //EXTRACT TOKEN
  {
    //taking jwt from the header
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    //using the secret key from .env
    secretOrKey: process.env.JWT_SECRET,
  },
  async (tokenPayload, done) => {
    //check has the token expired ?? // it will run evey time
    if (Date.now > tokenPayload.exp * 1000) {
      return done(null, false);
    }

    try {
      //valid token exp
      // console.log(tokenPayload);
      const user = await User.findById(tokenPayload._id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
