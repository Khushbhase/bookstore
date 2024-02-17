import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose, { mongo }  from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors'


const app = express();

// Middleware for parsing req body
app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods:['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// )

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome To Mern Stack")
});

app.use('/books', booksRoute);


mongoose.connect(mongoDBURL).then(()=>{
    console.log("App connected to DB")
    app.listen(PORT, ()=>{
        console.log(`ALL GOOD At ${PORT}`)
    })
}). catch((error)=>{
    console.log(error)
    res.status(500).send({message : error.message})
});