const passport = require('passport')
const db = require("../models/db.js")
var LocalStrategy = require('passport-local');
var OAuth2Strategy = require('passport-oauth2')
const bcrypt = require('bcrypt');
var JwtStrategy = require('passport-jwt').Strategy
var opts = require('./opts')

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
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await db.getOne("Users", "Username", jwt_payload.username)
            if (user) return done(null, user);
            else {
                const maxID = await db.query(`select MAX("Customers"."CusID") as "maxID" from "Customers"`)
                const data_cus={"CustomerName": jwt_payload.username,"Token":jwt_payload}
                data_cus["CusID"] = (maxID[0]['maxID']) ? parseInt(maxID[0]['maxID']) + 1 : 1
                await db.insert('Customers',data_cus)
                return done(null, user)
            }

        }
        catch (err) {
            console.log(err)
            return done(err, false)
        }
    }));
}