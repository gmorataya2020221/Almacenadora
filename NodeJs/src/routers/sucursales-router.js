const express = require('express');
const sucursalController = require('../controllers/sucursales.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_rol = require('../middlewares/rol');

const api = express.Router();

api.post('/agregarSucursal', [md_autenticacion.Auth, md_rol.ConfirmarAdmin], sucursalController.AgregarSucursal);
api.put('/editarSucursal/:idSucursal', [md_autenticacion.Auth, md_rol.ConfirmarAdmin], sucursalController.EditarSucursal);
api.delete('/eliminarSucursal/:idSucursal', [md_autenticacion.Auth, md_rol.ConfirmarAdmin], sucursalController.EliminarSucursal);

module.exports = api;