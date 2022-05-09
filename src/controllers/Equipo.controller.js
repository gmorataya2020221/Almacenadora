const Equipos = require('../models/Equipo.model');


function ObtenerEquipo (req, res) {
    Equipos.find({}, (err, productosEncontrados) => {

        let tabla = []
            for (let i = 0; i < equiposEncontrados.length; i++) {
                
                tabla.push(`Nombre: ${equiposEncontrados[i].nombre}, Categoria: ${equiposEncontrados[i].IDcategoria.nombre}`)
            }
            //console.log(productosEncontrados)
        return res.status(200).send({ equipos: tabla })
    }).populate('IDcategoria','nombre')
}


function AgregarEquipos (req, res) {
    var parametros = req.body;
    var modeloProductos = new Equipos();
    
    
    if (req.user.rol == "ADMIN") { 
        if( parametros.nombre && parametros.CantidadJugardores && parametros.DineroTransferencias && parametros.IDcategoria){
            modeloProductos.nombre = parametros.nombre;
            modeloProductos.stock = parametros.CantidadJugardores;
            modeloProductos.precioCU = parametros.DineroTransferencias;
            modeloProductos.IDcategoria = parametros.IDcategoria;
            
    
            modeloProductos.save((err, productoGuardado)=>{
                if(err) return res.status(500).send({message:"error en la peticion"})
                if(!productoGuardado) return res.status(500).send({message:"error al guardar el producto"})
                return res.status(200).send({ product: productoGuardado });   
            })
        
        } else {
            return res.send({ mensaje: "Debe enviar los parametros obligatorios."})
        }

    } else {
        return res.status(500).send({ mensaje: 'no puede egregar un equipo, no es un administrador' })
    }

}

function EditarEquipos(req, res) {
    var idEquip = req.params.idEquipo;
    var parametros = req.body;


    if (req.user.rol == "ADMIN") { 
        
        Equipos.findByIdAndUpdate(idEquip, parametros, { new : true } ,(err, equipoEditado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!equipoEditado) return res.status(404).send({ mensaje: 'Error al Editar el equipo' });
    
            return res.status(200).send({ productos: equipoEditado});
        })
    } else {
        return res.status(500).send({ mensaje: 'no puede egregar un equipo, no es un administrador' })
    }
}

function Jugadores(req, res) {
    const equipoId = req.params.idEquipo;
    const parametros = req.body;
    if (req.user.rol == "ADMIN") { 
        
        if(parametros.CantidadJugardores){
        
            Equipos.findByIdAndUpdate(equipoId, { $inc : {CantidadJugardores : parametros.CantidadJugardores} }, {new : true},
                (err, cantidadModificada)=>{
                    if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
                    if(!cantidadModificada) return res.status(500).send({mensaje: 'Error incrementar la cantidad del jugadores'});
        
                    return res.status(200).send({ producto: cantidadModificada })
                })
            }else{
                return res.status(500).send({ mensaje: "envie los parametros obligatorios" })
            }

    } else {
        return res.status(500).send({ mensaje: 'no puede agregar un producto, no es un administrador' })
    }

}

module.exports = {
    AgregarEquipos,
    EditarEquipos,
    ObtenerEquipo,
    Jugadores
}