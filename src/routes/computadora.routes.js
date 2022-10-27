import {Router} from "express"
import computadoraController from "../controllers/computadora.controller.js"
const controller = new computadoraController()
 const routerComputadoras = Router()

 routerComputadoras.post("/crear",(req,res) =>{
    controller.crearComputadora(req,res)
 })
 routerComputadoras.delete("/eliminar/:id", (req,res) =>{
    controller.eliminarComputadora(req,res)
 })
 
 routerComputadoras.get("/listar",(req,res) =>{
    controller.listarComputadoras(req,res)
})
//RUTAS PARA TABLA USOS-COMPUTADORAS
routerComputadoras.post("/reservas/crear",(req,res) =>{
   controller.reservarComputadora(req,res)
})

routerComputadoras.get("/reservas/listar",(req,res)=>{
   controller.reservasListar(req,res)
})

routerComputadoras.delete("/reservas/eliminar/:id",(req,res)=>{
   controller.reservasEliminar(req,res)
})



    
export default routerComputadoras