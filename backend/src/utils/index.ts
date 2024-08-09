import path from "path"
import fs from "fs"
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()

const accessTokenFolderPath = path.join(__dirname, "../access")
const accessTokenFilePath = path.join(accessTokenFolderPath, "accessToken.txt")
const refreshTokenFolderPath = path.join(__dirname, '../access');
const refreshTokenFilePath = path.join(accessTokenFolderPath, 'refreshToken.txt');

export const storeToken = async (token: {
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
}, userId : string) => {

    if(!token.access_token || token.access_token===undefined || !token.refresh_token || token.refresh_token===undefined){
        return false
    }
  if (fs.existsSync(accessTokenFolderPath)) {
    fs.mkdirSync(accessTokenFolderPath, { recursive: true });
  }
  fs.writeFileSync(accessTokenFilePath, token.access_token, {
    encoding: 'utf8',
    flag: 'w',
  });
  if (fs.existsSync(refreshTokenFolderPath)) {
    fs.mkdirSync(refreshTokenFolderPath, { recursive: true });
  }
  fs.writeFileSync(refreshTokenFilePath, token.refresh_token, {
    encoding: 'utf8',
    flag: 'w',
  });
  const res = await prisma.token.upsert({
    create : {
      accessToken : token.access_token,
      refresToken : token.refresh_token,
      userId : userId
    },
    update : {
      accessToken : token.access_token,
      refresToken : token.refresh_token
    },
    where : {id : userId}
  })

  console.log("Tokens are saved to ", accessTokenFilePath, " and ", refreshTokenFilePath)
  return true
};


export const getToken = async (userId : string)=>{
    // const accessToken = fs.readFileSync(accessTokenFilePath, {
    //   encoding: 'utf8',
    //   flag: 'r',
    // });
    // const refreshToken = fs.readFileSync(refreshTokenFilePath, {
    //   encoding: 'utf8',
    //   flag: 'r',
    // });
    const tokens = await prisma.token.findFirst({
      where : {
        id : undefined
      }
    })
    if(!tokens){
      return null
    }
    const token = {
        accessToken : tokens.accessToken,
        refreshToken : tokens.refresToken
    }
    return token
}



export let oauth2client: any;

export const initOauthClient = ()=>{
    oauth2client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: 'http://localhost:3000/api/auth/owner/google/callback',
    });

}