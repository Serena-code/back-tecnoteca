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
 routerCasco.get("/obtener", (req,res) =>{
    controller.usoCasco(req,res)
 })

export default routerCasco