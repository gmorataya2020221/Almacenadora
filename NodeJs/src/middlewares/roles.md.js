exports.ConfirmarAdmin = function(req, res, next) {
    if(req.user.rol !== "Admin") return res.status(403).send({mensaje: "Solo Admins tienen permiso"})
    
    next();
}

exports.ConfirmarEmpr = function(req, res, next) {
    if(req.user.rol !== "Emp") return res.status(403).send({mensaje: "Solo Empresas tienen permiso"})
    
    next();
}