const express = require('express');
const router = express.Router();
const { validateTitle, validateContent, validateAuthorId } = require('../middlewares/validator');
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.get('/author/:id', postController.getPostsByAuthorId);

router.post('/', validateTitle, validateContent, validateAuthorId, postController.createPost);

router.put('/:id', validateTitle, validateContent, postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;