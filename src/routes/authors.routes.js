const express = require('express');
const router = express.Router();
const { validateName, checkEmailOnCreate, checkEmailOnUpdate } = require('../middlewares/validator');
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAllAuthors);

router.get('/:id', authorController.getAuthorById);

router.post('/', validateName, checkEmailOnCreate, authorController.createAuthor);

router.put('/:id', validateName, checkEmailOnUpdate, authorController.updateAuthor);

router.delete('/:id', authorController.deleteAuthor);

module.exports = router;