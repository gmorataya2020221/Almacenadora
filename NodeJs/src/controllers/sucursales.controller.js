const Sucursal = require('../models/sucursales.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt.js');

function AgregarSucursal(req, res) {
    const modeloSucursal = new Sucursal();
    var parametros = req.body;

    if (parametros.nombre) {
        modeloSucursal.nombre = parametros.nombre;
        modeloSucursal.ubicacion = parametros.ubicacion;
        modeloSucursal.logo = parametros.logo;
        modeloSucursal.save((err, sucursalGuardada) => {

            return res.status(400).send({ sucursal: sucursalGuardada });
        });
    } else {
        return res.status(400).send({ mensaje: "Debe enviar los parametros obligatorios" })
    }
}

function EditarSucursal(req, res) {
    var idSucursal = req.params.idSucursal;
    var parametros = req.body;

    Sucursal.findByIdAndUpdate(idSucursal, parametros, { new: true }, (err, sucursalActualizada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!sucursalActualizada) return res.status(404)
            .send({ mensaje: "Error al editar sucursal" });

        return res.status(200).send({ sucursal: sucursalActualizada });
    })
}

function EliminarSucursal(req, res) {
    var idSucursal = req.params.idSucursal;

    Sucursal.findByIdAndDelete(idSucursal, (err, sucursalEliminada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!sucursalEliminada) return res.status(500)
            .send({ mensaje: "Error al eliminar sucursal" })

        return res.status(200).send({ sucursal: sucursalEliminada });
    })
}

module.exports = {
    AgregarSucursal,
    EditarSucursal,
    EliminarSucursal
}