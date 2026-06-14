export function validateName(name){
    if(!name){
        return res.status(400).json( { error: "El campo nombre es obligatorio"});
    }
    if(name.trim().length === 0 ){
        return res.status(400).json( { error: "El nombre no puede estar vacio"});
    }
};