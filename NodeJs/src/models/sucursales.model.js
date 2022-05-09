const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalesSchema = Schema({
    nombre: String,
    ubicacion: String,
    logo: String,
    usuario: [{
        idEmpresa: {type: Schema.Types.ObjectId, ref: 'Usuario'}
    }]
  
});

module.exports = mongoose.model('Sucursales', SucursalesSchema);