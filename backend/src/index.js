import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import cors from 'cors'
import { app,server } from './lib/socket.js'


dotenv.config()

const PORT=process.env.PORT 

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:'https://chatty-frontend-3uy7.onrender.com',
    credentials:true //we allow to sned cookies and headers send from frontend 
}))

//all apis
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})
