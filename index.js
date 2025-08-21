import express from "express";

import AuthRoutes from "./Routes/user.js";
import videoRoutes from "./Routes/video.js";
import cookieParser from "cookie-parser";
import CommentRoutes from './Routes/comment.js';
import cors from 'cors';



const app=express();
const port=4000;

app.use(cors({
   origin:'http://localhost:5173', //React app's URL
   credentials:true
}))
app.use(express.json());
app.use(cookieParser());
import "./Connection/conn.js";


app.use('/auth',AuthRoutes);
app.use('/api',videoRoutes);
app.use('/commentApi',CommentRoutes);

 app.listen(port,()=>{
    console.log("server is running");
 })
