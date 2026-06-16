const express = require('express');
const router = express.Router();
const { validateTitle, validateContent, validateAuthorIdFromBody, validateAuthorIdFromParams, checkTitleOnCreate, checkTitleOnUpdate, checkContentOnCreate, checkContentOnUpdate } = require('../middlewares/validator');
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);

router.get('/author/:id', validateAuthorIdFromParams, postController.getPostsByAuthorId);

router.get('/:id', postController.getPostById);

router.post('/', validateTitle, validateContent, validateAuthorIdFromBody, checkTitleOnCreate, checkContentOnCreate, postController.createPost);

router.put('/:id', validateTitle, validateContent, checkTitleOnUpdate, checkContentOnUpdate, postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;