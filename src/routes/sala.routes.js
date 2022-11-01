import {Router} from "express"
import salaController from "../controllers/sala.controller.js"
const controller = new salaController()
 const routerSalas = Router()

 routerSalas.post("/crear",(req,res) =>{
    controller.crearSala(req,res)
 })
 routerSalas.delete("/eliminar/:id",(req,res) =>{
    controller.eliminarSala(req,res)
 })
  
 routerSalas.get("/listar",(req,res) =>{
   controller.listarSalas(req,res)
})
//RUTAS PARA TABLA USOS-SALAS
routerSalas.post("/reservas/crear",(req,res) =>{
  controller.reservarSalas(req,res)
})

routerSalas.get("/reservas/listar",(req,res)=>{
  controller.reservasSalasListar(req,res)
})

routerSalas.delete("/reservas/eliminar/:id",(req,res)=>{
  controller.reservasSalasEliminar(req,res)
})
export default routerSalas