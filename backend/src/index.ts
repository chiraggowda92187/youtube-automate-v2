import cors from "cors"
import express from "express"
import session from "express-session"
import passport from "passport"
import { router } from "./router"
import { initPassprt } from "./passport/passport"
require("dotenv").config()

const app = express()


import { initOauthClient } from "./utils"


initOauthClient()
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);
app.use(express.json())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 360000000 },
  })
);
initPassprt()
app.use(passport.authenticate("session"))



app.use("/api", router)






app.listen(3000, ()=>{
    console.log("Backend server listening on port 3000")
})



