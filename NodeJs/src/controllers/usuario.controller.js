const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function AdminDefault(req, res) {
    var modeloUsuario = new Usuario();
    Usuario.find(
        { email: "SuperAdmin@kinal.edu.gt", nombre: "SuperAdmin" },
        (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length > 0) {
                console.log({ mensaje: "El administrador default ya ha sido creado" });
            } else {
                modeloUsuario.nombre = "SuperAdmin";
                modeloUsuario.email = "SuperAdmin@kinal.edu.gt";
                modeloUsuario.contraseña = "123456";
                modeloUsuario.rol = "Admin";
                bcrypt.hash(
                    modeloUsuario.contraseña,
                    null,
                    null,
                    (err, contraseñaEncryptada) => {
                        modeloUsuario.contraseña = contraseñaEncryptada;
                        modeloUsuario.save((err, usuarioGuardado) => {
                            if (err) console.log({ mensaje: "Error en la peticion" });
                            if (!usuarioGuardado)
                                console.log({ mensaje: "Error al crear al Admin default" });
                            console.log({ Usuario: usuarioGuardado });
                        });
                    }
                );
            }
        }
    );
}

function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ nombre: parametros.nombre }, (err, usuarioencontrado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion " });
        if (usuarioencontrado) {
            bcrypt.compare(
                parametros.contraseña,
                usuarioencontrado.contraseña,
                (err, VerificarContra) => {
                    if (VerificarContra) {
                        return res.status(200).send({ token: jwt.crearToken(usuarioencontrado) });
                    } else {
                        return res.status(500).send({ mensaje: "La contraseña no coincide" });
                    }
                }
            );
        } else {
            return res.status(500).send({ mensaje: "No se encontro el usuario" });
        }
    });
}

module.exports = {
    AdminDefault,
    Login,
};
