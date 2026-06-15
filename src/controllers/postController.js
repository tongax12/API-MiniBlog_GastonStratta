const postService = require('../services/postService');

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const post = await postService.getPostById(id);
        
        if(!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostsByAuthorId = async (req, res) => {
    try {
        const authorId = Number(req.params.id);
        const posts = await postService.getAllPostByAuthorId(authorId);
        
        if(posts.length === 0) {
            return res.status(404).json({ error: "Posts not found" });
        }
        
        const result = {
            author: {
                id: posts[0].author_id,
                name: posts[0].author_name,
                email: posts[0].author_email,
                bio: posts[0].author_bio
            },
            posts: posts.map(p => ({
                id: p.id,
                title: p.title,
                content: p.content,
                published: p.published,
                created_at: p.created_at
            }))
        };
        
        res.json(result);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content, author_id, published } = req.body;
        const post = await postService.createPost(title, content, author_id, published);
        res.status(201).json(post);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, content, published } = req.body;
        const post = await postService.updatePost(id, title, content, published);
        
        if(!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const post = await postService.deletePost(id);
        
        if(!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthorId,
    createPost,
    updatePost,
    deletePost
};