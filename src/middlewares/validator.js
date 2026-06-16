const pool = require('../../db/config');
const validator = require('validator');

const validateName = (req, res, next) =>{
    const {name} = req.body;
    
    if(!name){
        return res.status(400).json( { error: "El campo nombre es obligatorio"});
    }
    if(name.trim().length === 0 ){
        return res.status(400).json( { error: "El campo nombre no puede estar vacio"});
    }
    if(name.length > 100){
        return res.status(400).json( { error: "El nombre no debe exceder los 100 caracteres"});
    }

    next();
};

const checkEmailOnCreate = async (req,res, next) =>{
    const {email} = req.body;

    if(!email){
        return next();
    }

     if(!validator.isEmail(email)){
        return res.status(400).json({ error: "El formato del correo no es válido" });
    }


   try{
    const { rows } = await pool.query('SELECT * FROM authors WHERE email = $1',[email]);

    if(rows.length > 0){ return res.status(409).json( { error: "This mail is already use"});

    return next();
    }
   } catch(error){ 
    return res.status(500).json( { error: error.message } );
   }

   
};



const checkEmailOnUpdate = async (req, res, next) => {
    const { email } = req.body;
    const id = req.params.id;

    if(!email) {
        return next();
    }
    
    if(!validator.isEmail(email)) {
        return res.status(400).json({ error: "El formato del correo no es válido" });
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM authors WHERE email = $1 AND id != $2',
            [email, id]
        );

        if(rows.length > 0) {
            return res.status(409).json({ error: "El correo ya está en uso" });
        }
        
       return next();
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
};

const validateTitle = (req, res, next) =>{
    const {title} = req.body;

    if(!title){
        return res.status(400).json( { error: "El campo titulo es obligatorio"});
    }
    if(title.trim().length === 0 ){
        return res.status(400).json( { error: "El campo titulo no puede estar vacio"});
    }

    if(title.length > 255 ){
        return res.status(400).json( { error: "El titulo no debe exceder los 255 caracteres"})
    }

    return next();
}

const validateContent = (req, res, next) =>{
    const {content} = req.body;

    if(!content){
        return res.status(400).json( { error: "El campo contenido es obligatorio"});
    }
    if(content.trim().length === 0 ){
        return res.status(400).json( { error: "El campo contenido no puede estar vacio"});
    }

   return next();
}

const validateAuthorId = async (req, res, next) =>{
    const {author_id} = req.body;

    if(!author_id){
        return res.status(400).json( { error: "El campo author_id es obligatorio"});
    }
     if(isNaN(author_id) || author_id <= 0){
        return res.status(400).json( { error: "El campo author_id debe ser un número válido"});
    }

      try {
        const { rows } = await pool.query(
            'SELECT id FROM authors WHERE id = $1', 
            [author_id]
        );

        if(rows.length === 0) {
            return res.status(400).json({ 
                error: "El author_id no existe" 
            });
        }

       return next();
    } catch(error) {
       return res.status(500).json({ error: error.message });
    }

   
}

const checkTitleOnCreate = async (req, res, next) => {
    const { title } = req.body;

    if(!title) {
        return next();
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE title = $1',
            [title]
        );

        if(rows.length > 0) {
            return res.status(409).json({ error: "El título ya existe en otro post" });
        }
        
        return next();
    } catch(error) {
       return res.status(500).json({ error: error.message });
    }
};

const checkTitleOnUpdate = async (req, res, next) => {
    const { title } = req.body;
    const id = req.params.id;

    if(!title) {
        return next();
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE title = $1 AND id != $2',
            [title, id]
        );

        if(rows.length > 0) {
            return res.status(409).json({ error: "El título ya existe en otro post" });
        }
        
       return next();
    } catch(error) {
       return res.status(500).json({ error: error.message });
    }
};

const checkContentOnCreate = async (req, res, next) => {
    const { content } = req.body;

    if(!content) {
        return next();
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE content = $1',
            [content]
        );

        if(rows.length > 0) {
            return res.status(409).json({ error: "El contenido ya existe en otro post" });
        }
        
       return  next();
    } catch(error) {
       return res.status(500).json({ error: error.message });
    }
};

const checkContentOnUpdate = async (req, res, next) => {
    const { content } = req.body;
    const id = req.params.id;

    if(!content) {
        return next();
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE content = $1 AND id != $2',
            [content, id]
        );

        if(rows.length > 0) {
            return res.status(409).json({ error: "El contenido ya existe en otro post" });
        }
        
        return next();
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { validateName, validateTitle, validateContent, validateAuthorId, checkEmailOnCreate, checkEmailOnUpdate, checkTitleOnCreate, checkTitleOnUpdate, checkContentOnCreate, checkContentOnUpdate};