const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "llave";



exports.crearToken = function (usuario){
    let payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt_simple.encode(payload, claveSecreta);
}