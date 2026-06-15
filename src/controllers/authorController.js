const authorService = require('../services/authorService');

const getAllAuthors = async (req, res) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.json(authors);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const author = await authorService.getAuthorById(id);
        
        if(!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json(author);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const createAuthor = async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const author = await authorService.createAuthor(name, email, bio);
        res.status(201).json(author);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, bio } = req.body;
        const author = await authorService.updateAuthor(id, name, email, bio);
        
        if(!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json(author);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const author = await authorService.deleteAuthor(id);
        
        if(!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json(author);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
