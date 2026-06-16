const express = require('express');
const router = express.Router();
const { validateTitle, validateContent, validateAuthorId, checkTitleOnCreate, checkTitleOnUpdate, checkContentOnCreate, checkContentOnUpdate } = require('../middlewares/validator');
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.get('/author/:id', postController.getPostsByAuthorId);

router.post('/', validateTitle, validateContent, validateAuthorId, checkTitleOnCreate, checkContentOnCreate, postController.createPost);

router.put('/:id', validateTitle, validateContent, checkTitleOnUpdate, checkContentOnUpdate, postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;