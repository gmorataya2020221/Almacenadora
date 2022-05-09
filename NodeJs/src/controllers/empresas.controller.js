const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const res = require("express/lib/response");
const Empresa = require("../models/empresa.model");

function AgregarEmpresa(req, res) {
    const modeloEmpresa = new Empresa();
    var parametros = req.body;

    if (req.user.rol == "Admin") {
        modeloEmpresa.nombre = parametros.nombre;
        modeloEmpresa.ubicacion = parametros.ubicacion;
        modeloEmpresa.descripcion = parametros.descripcion;
        modeloEmpresa.rol = "Emp";

        modeloEmpresa.save((err, empresaGuardada) => {
            if (err)
                return res
                    .status(500).send({ mensaje: "Error en la peticion" });
            if (!empresaGuardada)
                return res
                    .status(500).send({ mensaje: "Error al agregar la empresa" });

            return res.status(200).send({ empresa: empresaGuardada });
        });
    } else {
        return res.status(400).send({ mensaje: "Debe enviar los parametros obligatorios" })
    }
}

function EditarEmpresa(req, res) {
    var parametros = req.body;
    var idEmpresa = req.params.idEmpresa;
    if ((req.user.rol = "Admin")) {
        Empresa.findByIdAndUpdate(idEmpresa, parametros, { new: true }, (err, empresaActualizada) => {
            if (err)
                return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!empresaActualizada)
                res.status(500).send({ mensaje: "Error al editar la empresa" });

            return res.status(200).send({ empresa: empresaActualizada });
        }
        );
    } else {
        return res.status(500).send({ mensaje: "No cuentas con el permiso Admin para EDITAR empresas" });
    }
}

function EliminarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (req.user.rol == "Admin") {
        Empresa.findByIdAndDelete({ _id: idEmpresa }, (err, empresaEliminada) => {
            if (err)
                return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!empresaEliminada)
                return res.status(500).send({ mensaje: "Error al eliminar la empresa" });

            return res.status(200).send({ empresa: empresaEliminada });
        });
    } else {
        return res.status(500).send({
            mensaje: "No cuentas con el permiso Admin para ELIMINAR empresas",
        });
    }
}

function ObtenerEmpresas(req, res) {
    if (req.user.rol == "Admin") {
        Empresa.find({}, (err, empresaEncontradas) => {
            if (err)
                return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!empresaEncontradas)
                return res.status(500).send({ mensaje: "Error al obtener las empresas" });

            return res.status(200).send({ empresa: empresaEncontradas });
        });
    } else {
        return res.status(500).send({ mensaje: "No cuentas con el permiso Admin para VER empresas" });
    }
}
module.exports = {
    AgregarEmpresa,
    EditarEmpresa,
    EliminarEmpresa,
    ObtenerEmpresas,
};
