const pool = require('../../db/config');
const validator = require('validator');
const { createError } = require('./errorHandler');

const validateName = (req, res, next) =>{
    const {name} = req.body;
    
    if(!name){
        return next(createError(400, 'El campo nombre es obligatorio'));
    }
    if(name.trim().length === 0 ){
        return next(createError(400, 'El campo nombre no puede estar vacio'));
    }
    if(name.length > 100){
        return next(createError(400, 'El nombre no debe exceder los 100 caracteres'));
    }

    next();
};

const checkEmailOnCreate = async (req,res, next) =>{
    const {email} = req.body;

    if(!email){
        return next(createError(400, 'El campo email es obligatorio'));
    }

    if(!validator.isEmail(email)){
        return next(createError(400, 'El formato del correo no es válido'));
    }


   try{
    const { rows } = await pool.query('SELECT * FROM authors WHERE email = $1',[email]);

    if(rows.length > 0){ 
        
        return next(createError(409,'El email ingresado ya está en uso'));

    }
   return next();
   } catch(error){ 
    next(createError(500, error.message));
   }

   
};



const checkEmailOnUpdate = async (req, res, next) => {
    const { email } = req.body;
    const id = req.params.id;

    if(!email){
        return next(createError(400, 'El campo email es obligatorio'));
    }
    
    if(!validator.isEmail(email)){
        return next(createError(400, 'El formato del correo no es válido'));
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM authors WHERE email = $1 AND id != $2',
            [email, id]
        );

        if(rows.length > 0) {
            return next(createError(409,'El email ingresado ya está en uso'));
        }
        
       return next();
    } catch(error) {
       next(createError(500, error.message));
    }
};

const validateTitle = (req, res, next) =>{
    const {title} = req.body;

    if(!title){
        return next(createError(400,'El campo titulo es obligatorio'));
    }
    if(title.trim().length === 0 ){
        return next(createError(400, 'El campo titulo no puede estar vacio'));
    }

    if(title.length > 255 ){
        return next(createError(400, 'El titulo no debe exceder los 255 caracteres'))
    }

    return next();
}

const validateContent = (req, res, next) =>{
    const {content} = req.body;

    if(!content){
        return next(createError(400, 'El campo contenido es obligatorio'));
    }
    if(content.trim().length === 0 ){
        return next(createError(400, 'El campo contenido no puede estar vacio'));
    }

   return next();
}

const validateAuthorIdFromBody = async (req, res, next) => {
  const author_id = req.body.author_id;

  if (!author_id) {
    return next(createError(400, 'El campo author_id es obligatorio'));
  }
  if (isNaN(author_id) || author_id <= 0) {
    return next(createError(400, 'El campo author_id debe ser un número válido'));
  }

  try {
    const { rows } = await pool.query(
      'SELECT id FROM authors WHERE id = $1',
      [author_id]
    );

    if (rows.length === 0) {
      return next(createError(400, 'El author_id no existe'));
    }

    return next();
  } catch (error) {
    next(createError(500, error.message));
  }
};
const validateAuthorIdFromParams = async (req, res, next) =>{
    const author_id = req.params.id;

    if(!author_id){
        return next(createError(400, 'El campo author_id es obligatorio'));
    }
     if(isNaN(author_id) || author_id <= 0){
        return next(createError(400, 'El campo author_id debe ser un número válido'));
    }

      try {
        const { rows } = await pool.query(
            'SELECT id FROM authors WHERE id = $1', 
            [author_id]
        );

        if(rows.length === 0) {
            return next(createError(400, 'El author_id no existe'));
        }

       return next();
    } catch(error) {
       next(createError(500, error.message));
    }

   
}

const checkTitleOnCreate = async (req, res, next) => {
    const { title } = req.body;

    if(!title){
        return next(createError(400,'El campo titulo es obligatorio'));
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE title = $1',
            [title]
        );

        if(rows.length > 0) {
            return next(createError(409, 'El título ya existe en otro post'));
        }
        
        return next();
    } catch(error) {
       next(createError(500, error.message));
    }
};

const checkTitleOnUpdate = async (req, res, next) => {
    const { title } = req.body;
    const id = req.params.id;

    if(!title){
        return next(createError(400,'El campo titulo es obligatorio'));
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE title = $1 AND id != $2',
            [title, id]
        );

        if(rows.length > 0) {
            return next(createError(409, 'El título ya existe en otro post'));
        }
        
       return next();
    } catch(error) {
       next(createError(500, error.message));
    }
};

const checkContentOnCreate = async (req, res, next) => {
    const { content } = req.body;

    if(!content) {
        return next(createError(400, 'El contenido es un campo obligatorio'));
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE content = $1',
            [content]
        );

        if(rows.length > 0) {
            return next(createError(409,'El contenido ya existe en otro post'));
        }
        
       return  next();
    } catch(error) {
        next(createError(500, error.message));
    }
};

const checkContentOnUpdate = async (req, res, next) => {
    const { content } = req.body;
    const id = req.params.id;

    if(!content) {
        return next(createError(400, 'El contenido es un campo obligatorio'));
    }

    try {
        const { rows } = await pool.query(
            'SELECT * FROM posts WHERE content = $1 AND id != $2',
            [content, id]
        );

        if(rows.length > 0) {
            return next(createError(409,'El contenido ya existe en otro post'));
        }
        
        return next();
    } catch(error) {
        next(createError(500, error.message));
    }
};

module.exports = { validateName, validateTitle, validateContent, validateAuthorIdFromBody, validateAuthorIdFromParams, checkEmailOnCreate, checkEmailOnUpdate, checkTitleOnCreate, checkTitleOnUpdate, checkContentOnCreate, checkContentOnUpdate};