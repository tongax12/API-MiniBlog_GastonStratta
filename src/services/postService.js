const pool = require('../../db/config')

const getAllPosts = async () =>{
    const result = await pool.query('SELECT * FROM posts ORDER BY id ASC');

    return result.rows;
}

const getPostById = async (id) =>{
    const result = await pool.query('SELECT * FROM posts WHERE id = $1',[id]);

    return result.rows[0];
}

const getAllPostByAuthorId = async (authorId) => {
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
            authors.bio AS author_bio
        FROM posts
        JOIN authors ON posts.author_id = authors.id
        WHERE posts.author_id = $1
    `;
    const result = await pool.query(query, [authorId]);
    return result.rows;
}

const createPost = async (title, content, author_id, published) => {
    const result = await pool.query('INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',[title, content, author_id, published]);

    return result.rows[0];
}

const updatePost = async (id, title, content, published) => {
    const result = await pool.query('UPDATE posts SET title= $1, content= $2, published= $3 WHERE id = $4 RETURNING *', [title, content, published, id]);

    return result.rows[0];
}

const deletePost = async (id) => {
    const result = await pool.query('DELETE FROM posts WHERE id= $1 RETURNING *', [id]);

    return result.rows[0];
}

module.exports = {
    getAllPosts,
    getPostById,
    getAllPostByAuthorId,
    createPost,
    updatePost,
    deletePost
};