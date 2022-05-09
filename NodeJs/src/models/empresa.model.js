const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({

    nombre: String,
    ubicacion: String, 
    descripcion: String,
    rol: String, 
    sucursales: [{
        nombre: String, 
        ubicacion: String, 
        logo: String
    }]

})
module.exports = mongoose.model('Empresa', EmpresaSchema)