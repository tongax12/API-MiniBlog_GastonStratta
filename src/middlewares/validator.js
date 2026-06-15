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

const checkEmailOnCreate = (req,res, next) =>{
    const {email} = req.body;

    if(!email){
        return next();
    }

    const emailExist = authors.find(au => au.email === email);

    if(emailExist){
        return res.status(409).json( { error: "This mail is already use"})
    }

    next();
};



const checkEmailOnUpdate = (req,res, next) =>{
    const {email} = req.body;

    const id = req.params.id;

    if(!email){
        return next();
    }

    const emailExist = authors.find(au => au.email === email && au.id !== parseInt(id));

    if(emailExist){
        return res.status(409).json( { error: "This mail is already use"})
    }

    next();
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

    next();
}

const validateTitle = (req, res, next) =>{
    const {content} = req.body;

    if(!content){
        return res.status(400).json( { error: "El campo contenido es obligatorio"});
    }
    if(content.trim().length === 0 ){
        return res.status(400).json( { error: "El campo contenido no puede estar vacio"});
    }

    next();
}

const validateAuthorId = (req, res, next) =>{
    const {author_id} = req.body;

    if(!author_id){
        return res.status(400).json( { error: "El campo author_id es obligatorio"});
    }
     if(isNaN(author_id) || author_id <= 0){
        return res.status(400).json( { error: "El campo author_id debe ser un número válido"});
    }

    next();
}

module.exports = { validateName, checkEmailOnCreate, checkEmailOnUpdate};