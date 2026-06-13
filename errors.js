export function createError(message, statusCode){
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

export function badRequest(message){
    return createError(message, 400);
}
//aaaaaaaaaaa
export function notFound(message){
    return createError(message,404);
}

export function unauthorized(message){
    return createError(message, 401);
}

export function forbidden(message) {
    return createError(message,403);
}

export function internalError(message){
    return createError(message,500)
}