import express from "express"
import { authRouter } from "./auth/auth"
import { dataRouter } from "./dataRouter/dataRouter"
export const router = express.Router()







router.use("/auth", authRouter)
router.use("/data", dataRouter)


