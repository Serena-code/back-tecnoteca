import {Router} from "express"
import computadoraController from "../controllers/sala.controller.js"
const controller = new salaController()
 const routerSalas = Router()

 routerSalas.post("/crear",(req,res) =>{
    controller.crearSala(req,res)
 })
 routerSalas.delete("/eliminar/:id",(req,res) =>{
    controller.eliminarSala(req,res)
 })
 routerSalas.get("7obtener",(req,res) =>{
    controller.usoSala (req,res)
 })
    
export default routerSalas