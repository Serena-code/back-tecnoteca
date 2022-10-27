import {Router} from "express"
import computadoraController from "../controllers/computadora.controller.js"
const controller = new computadoraController()
 const routerComputadoras = Router()

 routerComputadoras.post("/crear",(req,res) =>{
    controller.crearComputadora(req,res)
 })
 routerComputadoras.delete("/borrar/:id", (req,res) =>{
    controller.eliminarComputadora(req,res)
 })
 routerComputadoras.get("/obtener",(req,res) =>{
   controller.usoComputadora(req,res)
})
    
export default routerComputadoras