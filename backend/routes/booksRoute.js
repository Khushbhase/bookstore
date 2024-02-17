import express, { Router } from 'express';
import { Book } from "../models/bookModel.js"
const router = express.Router();

//Route for save new book
router.post('/', async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message:'Send all required fields'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: !req.body.publishYear,
        };

        const book = await Book.create(newBook)

        return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message : error.message})
        
    }
})

//Route to get all books
router.get('/', async(req,res)=>{
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count:books.length,
            data:books,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message : error.message})

    }
});

//Route to get one books by id
router.get('/:id', async(req,res)=>{
    try {

        const { id } = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message : error.message})

    }
});

//route for update a book
router.put("/:id", async(req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            res.status(400).send({
                message:'Send all required fields'
            })
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: 'Book Not found'})
        }

        return res.status(200).json({message: 'Book updated !'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message : error.message})
    }
})

//Deleting a book
router.delete('/:id', async (req,res)=>{
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book Not found'})
        }
        return res.status(200).json({message: 'Book deleted !'})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message : error.message})
    }
})

export default router ;