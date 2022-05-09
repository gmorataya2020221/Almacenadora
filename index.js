const mongoose = require('mongoose');
const Admin = require('./src/controllers/usuario.controller');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Sucursales', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se conecto exitosamente al servidor");

    app.listen(3000, function () {
        console.log("El servidor se encuentra corriendo correctamente en el puerto 3000");
        Admin.AdminDefault();
        
    })

}).catch(error => console.log(error));