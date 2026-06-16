const authorService = require('../services/authorService');
const { createError } = require('../middlewares/errorHandler');

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.json(authors);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const getAuthorById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const author = await authorService.getAuthorById(id);
        
        if (isNaN(id)) {
        return next(createError(400, 'Id inválido'));
     }

        if(!author) {
            return next(createError(404,'Autor no encontrado'));
        }
        res.json(author);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const createAuthor = async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;
        const author = await authorService.createAuthor(name, email, bio);
        return res.status(201).json(author);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const updateAuthor = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, email, bio } = req.body;
        const author = await authorService.updateAuthor(id, name, email, bio);
        if (isNaN(id)) {
        return next(createError(400, 'Id inválido'));
     }
        if(!author) {
            return next(createError(404,'Autor no encontrado' ));
        }
        res.json(author);
    } catch(error) {
        next(createError(500, error.message));
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const author = await authorService.deleteAuthor(id);
        
        if (isNaN(id)) {
        return next(createError(400, 'Id inválido'));
        }

        if(!author) {
            return next(createError(404,'Autor no encontrado' ));
        }
        res.json(author);
    } catch(error) {
        next(createError(500, error.message));
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
