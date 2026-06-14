const pool = require('../../db/config');
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');
const express = require('express');
const router = express.Router();
import { createError } from '../../errors';
const app = express();

app.use(express.json());

router.get('/', async (req,res)=>{
    try{
        const authorList = await pool.query('SELECT * FROM authors');
        res.json(result.rows);
    } catch (error) { 
    res.status(500).json( { error: error.message });
    }

});

router.get('/:id', async (req,res) =>{
    try{
        const id = Number(req.params.id);

        const result = await pool.query('SELECT * FROM authors WHERE id = $1',[id]);

        if(result.rows.length === 0){ 
            return res.status(404).json( { error: "Author not found" });
        }

        res.json(result.rows[0]);
    } catch(error){
        res.status(500).json( { error: error.message });
    }
});


router.post('/', async (req,res) =>{
    try{
        const { name, email, bio } = req.body;

        const result = await pool.query(
            'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',[name,email,bio]
        )

        res.status(201).json(result.rows[0]);
    } catch(error) {
        res.status(500).json( { error: error.messsage})
    }

});

router.put('/:id', async (req,res) =>{
    const id = Number(req.params.id);
    
    const {name, email, bio};
    //hacer el if
    try{
        const updateAuthor = await pool.query('UPDATE authors name= $1, email= $2, bio= $3 WHERE id = $4 RETURNING *', [name, email,bio, id]);
        if(updateAuthor.rows.length === 0){
            return res.status(404).json( {error: "Author not found"} );
        }
        res.status(200).json
    } catch(error) {
        res.status(500).json( { error: error.messsage})
    }
});

router.delete('/:id', async(req,res) => {
    const id = Number(req.params.id);
    try{
    const authorDelete = await pool.query('DELETE FROM authors WHERE id= $1 RETURNING *', [id]);
    if(authorDelete.rows.length === 0){
        return res.status(404).json( { error: "Author not found"} );
    } 
    res.status(200).json(authorDelete.rows[0]);
    } catch(error) {
        res.status(500).json( { error: error.messsage})
    }
})

module.exports = router;