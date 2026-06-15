const pool = require('../../db/config');
const express = require('express');
const router = express.Router();
//import { createError } from '../../errors';

router.get('/', async (req,res) =>{
    try{
        const listPosts = await pool.query('SELECT * FROM posts ORDER BY id ASC');
        res.json(listPosts.rows);
    } catch(error) {
        res.status(500).json( { error: error.message})
    }
})

router.get('/:id', async (req,res) =>{
    const id = Number(req.params.id);
    try{

        const post = await pool.query('SELECT * FROM authors WHERE id = $1',[id]);

        if(post.rows.length === 0){ 
            return res.status(404).json( { error: "Post not found" });
        }

        res.json(post.rows[0]);

    } catch(error){
        res.status(500).json( { error: error.message });
    }
});

router.get('/author/:id', async (req,res) =>{
    const authorId  = Number(req.params.id);

    const query = `
    SELECT
    posts.id,
    posts.title,
    posts.content,
    posts.published,
    posts.created_at,
    authors.id AS author_id,
    authors.name AS author_name,
    authors.email AS author_email,
    authors.bio AS authors_bio
    FROM posts
    JOIN authors ON posts.author_id = authors.id
    WHERE posts.author_id = $1;
    `;

    try{
        

        const { rows } = await pool.query( query ,[authorId]);

        if(rows.length === 0){ 
            return res.status(404).json( { error: "Posts of this author not found" });
        }
        
        const authorAndPost ={
            author: {
                id: rows[0].author_id,
                name: rows[0].author_name,
                mail: rows[0].author_email,
                bio: rows[0].author_bio,
            },
            posts: rows.map(row => ({
                id: row.id,
                title: row.title,
                content: row.content,
                published: row.published,
                created_at: row.created_at,
            })),
        };

        res.json(authorAndPost);
        
    } catch(error){
        res.status(500).json( { error: error.message });
    }
});

router.post('/', async (req,res) =>{
   
    const { title, content, author_id, published } = req.body;
   
    try{

        const result = await pool.query(
            'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',[title, content, author_id, published]
        )

        res.status(201).json(result.rows[0]);
    } catch(error) {
        res.status(500).json( { error: error.message})
    }

});

router.put('/:id', async (req,res) =>{
    const id = Number(req.params.id);
    
    const {title, content, published} = req.body;
    //hacer el if
    try{
        const updatePost = await pool.query('UPDATE posts SET title= $1, content= $2, published= $3 WHERE id = $4 RETURNING *', [title, content, published, id]);
        if(updatePost.rows.length === 0){
            return res.status(404).json( {error: "Author not found"} );
        }
        res.status(200).json(updatePost.rows[0])
    } catch(error) {
        res.status(500).json( { error: error.message})
    }
});

router.delete('/:id', async(req,res) => {
    const id = Number(req.params.id);
    try{
    const postDelete = await pool.query('DELETE FROM posts WHERE id= $1 RETURNING *', [id]);
    if(postDelete.rows.length === 0){
        return res.status(404).json( { error: "Post not found"} );
    } 
    res.status(200).json(postDelete.rows[0]);
    } catch(error) {
        res.status(500).json( { error: error.messsage})
    }
})

module.exports = router;