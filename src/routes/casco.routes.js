import {Router} from "express"
import computadoraController from "../controllers/casco.controller.js"
const controller = new cascoController()
 const routerCasco = Router()

 routerCasco.post("/crear",(req,res) =>{
    controller.crearCasco(req,res)
 })
 routerCasco.delete("/eliminar/:id",(req,res) =>{
    controller.eliminarCasco(req,res)
 })
 routerCasco.get("/listar",(req,res) =>{
   controller.listarCasco(req,res)
})
//RUTAS PARA TABLA USOS-CASCO
routerCasco.post("/reservas/crear",(req,res) =>{
  controller.reservarCasco(req,res)
})

routerCasco.get("/reservas/listar",(req,res)=>{
  controller.reservasCascoListar(req,res)
})

routerCasco.delete("/reservas/eliminar/:id",(req,res)=>{
  controller.reservasCascoEliminar(req,res)
})


export default routerCasco