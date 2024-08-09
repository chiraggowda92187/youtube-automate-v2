import fs,{ writeFile, writeFileSync } from "fs";
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import path from "path";


export function initPassprt() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          callbackURL: 'http://localhost:3000/api/auth/google/callback',
          scope: [
            'profile',
            'email'
          ],
        },
        function verify(accessToken, refreshToken, profile, cb) {
          // database call here to store the access token, profile only if the email is the owner email
          console.log(profile);
          const user = {
            name : profile.displayName,
            id : profile.id,
            profileUrl : profile.photos?.[0].value
          }
          return cb(null, user);
        }
      )
    );
    passport.serializeUser(function (user, cb) {
      
      process.nextTick(function () {
        return cb(null, user);
      });
    });

    passport.deserializeUser(function (user: any, cb) {
      process.nextTick(function () {
        return cb(null, user);
      });
    });
}
