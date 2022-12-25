const passport = require('passport')
const db = require("../models/db.js")
var LocalStrategy = require('passport-local');
var OAuth2Strategy = require('passport-oauth2')
const bcrypt = require('bcrypt');
module.exports = app => {
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('session'));
    passport.serializeUser(function (user, done) {
        done(null, user.Username)
    });

    passport.deserializeUser(async function (username, done) {
        try {
            const user = await db.getOne("Users", "Username", username)
            done(null, user.Username);
        }
        catch (err) {
            done(err, null)
        }
    });
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                const user = await db.getOne("Users", "Username", username)
                if (!user) {
                    return done(null, false);
                }
                const cmp = await bcrypt.compare(password, user.Password)
                if (!cmp) {
                    return done(null, false);
                }
                return done(null, user)
            }
            catch (err) {
                return done(err);
            }
        }
    ));
}