import {pool} from "../db/connection.js"
export default class salaController{
    constructor(){
    }
    async eliminarSala(req,res){
        const id= req.params.id
        console.log(id)
        try{
            const result = await pool.query("DELETE FROM registro_salas WHERE id = ?",[id])
            return res.status(204).json({error:false, message: "se borro corectamente la sala"})
        }catch(error){
            return res.status(404).jason({error:true, message: "el id no coincide con ningun registro"})
        }
    }
    async crearSala(req,res){
        try {
            const sala = {
                fecha_de_creacion: new Date()
            }
            const result = await pool.query("INSERT INTO registro_salas set ?", [sala])
            return res.status(201).json({error:false, message:"se creo una nueva sala"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error:true, message:"ocurrio un error creando una nueva sala"})
        }
    }
    async usoSala(req,res){
        const {id, nombre, dni, fecha_inicio, horario_inicio,motivo} = req.body
        const {id_salas} = req.result;
        const newSala = {
            nombre,dni,fecha_inicio,horario_inicio,motivo,id
        }
        try{
            let result = await pool.query("SELECT id from registro_salas where en_uso = 0")
            await pool.query("UPDATE registro_salas SET en_uso = 1 WHERE id = id_salas")
            await pool.query("INSERT INTO uso_salas set ?", [newSala])
            return res.status(201).json({error:false,message:"se creo la reserva"})
        }catch(error){
            return res.status(500).json({error:true, message:"ocurrio un error creando la nueva reserva"})
        }
    }

}