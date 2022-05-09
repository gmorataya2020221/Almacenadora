const express = require('express');
const empresaController = require('../controllers/empresas.controller');
const md_authorization = require('../middlewares/autenticacion.md');
const api = express.Router();

api.post('/agregarEmpresa', md_authorization.Auth ,empresaController.AgregarEmpresa);
api.put('/editarEmpresa/:idEmpresa', md_authorization.Auth, empresaController.EditarEmpresa);
api.delete('/eliminarEmpresa/:idEmpresa', md_authorization.Auth, empresaController.EliminarEmpresa);
api.get('/obtenerEmpresas', md_authorization.Auth, empresaController.ObtenerEmpresas);

module.exports = api;