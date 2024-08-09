import express from 'express';
import fs, { createReadStream, readFileSync } from 'fs';
import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';
import { getToken, oauth2client } from '../../utils';
export const dataRouter = express.Router();
import { PassThrough } from 'stream';
import { PrismaClient } from '@prisma/client';

const uploadDir = path.join(__dirname, '../Videouploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// const storage = multer.diskStorage({
//     destination : (req, file, cb)=>{      
//         cb(null, uploadDir)
//     },
//     filename : (req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({storage : storage})
const upload = multer();



dataRouter.post("/uploadVideo", upload.single('videoToBeUploaded'),async(req : any, res)=>{
    //upload video end point
    //verify first if user is actually a verified user or not
    if(req.user===undefined || !req.user){        
      return res.redirect("/api/auth/google")
    }

    const token = await getToken(req.user.id)
    if(token===null){
      console.log("no token found")
      return res.status(411).redirect("http://localhost:5173/homepage")
    }
    // console.log("Fetched token from localstorage / database : ",token)
    console.log("Fetched from database, ", token)
    oauth2client.setCredentials({
      access_token : token.accessToken,
      refresh_token : token.refreshToken
    })

    const youtube = google.youtube("v3")
    try {
        const {title, description} = req.body
        //stream beginning
        const videoStream = new PassThrough()
        videoStream.end(req.file?.buffer)
        console.log('Before response');
        const response = await youtube.videos.insert({
          part: ['snippet', 'status'],
          requestBody: {
            snippet: {
              title: title,
              description: description,
            },
            status: {
              privacyStatus: 'private', // Or "private" or "unlisted"
            },
          },
          media: {
            // body: createReadStream(req.file?.path ? req.file?.path : ''),
            body: videoStream
          },
          auth: oauth2client,
        });
        console.log("After response")
        return res
          .status(200)
          .json({
            message: 'Video uploaded successfully',
            data: response.data,
          });
    } 
    catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ message: 'Error uploading video', error });
    } 
})
