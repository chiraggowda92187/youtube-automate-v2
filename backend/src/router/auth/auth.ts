import express from 'express';
import passport from 'passport';
export const authRouter = express.Router();
import { google } from 'googleapis';
import { oauth2client, storeToken } from '../../utils';
import { profile } from 'console';
import https from "https"

const scope = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];





authRouter.get('/google', passport.authenticate("google", {prompt : "consent"}));

authRouter.get('/google/callback', passport.authenticate('google', {successRedirect : "http://localhost:5173", failureRedirect : "/api/auth/google"}));


authRouter.get("/refresh", (req, res)=>{
  if(req.user===undefined){
    return res.redirect("/api/auth/google")
  }
  return res.status(200).json({
    name: req.user.name,
    id: req.user.id,
    profileUrl : req.user.profileUrl
  });
})



authRouter.get("/owner/google", (req, res)=>{
  //important step ( getting the rerfresh token is very important )
  const ownerEmail = req.body.ownerEmail
  console.log(ownerEmail)
  // if(ownerEmail !== process.env.OWNER_EMAIL){
  //   return res.status(411).json({
  //     message : "Invalid owner email"
  //   })
  // }
  const genrUrl = oauth2client.generateAuthUrl({
    access_type: 'offline', // main things 1 for this to work
    scope: scope,
    include_granted_scopes: true, // main things 2 for this to work
    // prompt: 'consent', // main things 3 for this to work
  });
  res.redirect(genrUrl)
})

authRouter.get("/owner/google/callback", async(req, res)=>{
  console.log('call back hit');
  // const queryParams = req.query
  // console.log(params)
  const code = req.query.code as string;
  // const userInfo = await oauth2client.userinfo.get()
  const token = await oauth2client.getToken(code);
  
  console.log(token)
  const mainToken = {
    access_token: token.tokens.access_token,
    refresh_token: token.tokens.refresh_token,
  };
  oauth2client.setCredentials({
      access_token : mainToken.access_token,
      refresh_token : mainToken.refresh_token
    })
  const oauth2 = google.oauth2({
    auth : oauth2client,
    version : 'v2'
  })
  const userInfo = await oauth2.userinfo.get()
  if (
    userInfo.data.email !== process.env.OWNER_EMAIL1 &&
    userInfo.data.email !== process.env.OWNER_EMAIL2
  ) {
    // console.log(userInfo.data.email);
    // console.log(process.env.OWNER_EMAIL1);
    // console.log(process.env.OWNER_EMAIL2);
    await new Promise((resolve, reject) => {
      let postData = 'token=' + mainToken.access_token;
      let postOptions = {
        host: 'oauth2.googleapis.com',
        port: 443,
        path: '/revoke',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const postReq = https.request(postOptions, (res) => {
        let responseData = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          console.log('Status Code:', res.statusCode);// Status code of 200 means successfull revoke , 400 means un successful
          console.log('Response:', responseData || '{}');
          resolve("");
        });
      });

      postReq.on('error', (error) => {
        console.error(error);
        reject(error); // Reject the promise on error
      });

      // Post the request with data
      postReq.write(postData);
      postReq.end();
    });
    
    return res.status(411).redirect("http://localhost:5173");
  }
  const status = await storeToken(mainToken, userInfo.data.id ? userInfo.data.id : "")
  if(status===false){
    return res.status(411).json({message : "invalid credentials / access not provided!"})
  }

  return res.redirect("/api/auth/google");
})



