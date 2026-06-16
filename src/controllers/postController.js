const { createError } = require('../middlewares/errorHandler');
const postService = require('../services/postService');

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const getPostById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const post = await postService.getPostById(id);
        
        if (isNaN(id)) {
        return next(createError(400, 'Id inválido'));
        }

        if(!post) {
            return next(createError(404, 'Post no encontrado' ));
        }
        res.json(post);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const getPostsByAuthorId = async (req, res, next) => {
    try {
        const authorId = Number(req.params.id);
        const posts = await postService.getAllPostByAuthorId(authorId);
        
        if(posts.length === 0) {
            return next(createError(404,'El autor no tiene post publicados'));
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
        next(createError(500, error.message));
    }
};

const createPost = async (req, res, next) => {
    try {
        const { title, content, author_id, published } = req.body;
        const post = await postService.createPost(title, content, author_id, published);
        res.status(201).json(post);
    } catch(error) {
       next(createError(500, error.message));
    }
};

const updatePost = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { title, content, published } = req.body;
        const post = await postService.updatePost(id, title, content, published);
       
        if (isNaN(id)) {
        return next(createError(400, 'Id inválido'));
        }

        if(!post) {
            return next(createError(404, 'Post no encontrado'));
        }

        res.json(post);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const deletePost = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const post = await postService.deletePost(id);
        if (isNaN(id)) {
        return next(createError(400, 'Id inválido'));
        }
        if(!post) {
            return next(createError(404, 'Post no encontrado'));
        }
        res.json(post);
    } catch(error) {
        next(createError(500, error.message));
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