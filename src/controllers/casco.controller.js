import {pool} from "../db/connection.js"
export default class cascoController{
    constructor(){
    }
    async eliminarCasco(req,res){
        const id = req.params.id
        console.log(id)
        try{
          const result = await  pool.query("DELETE FROM registro_casco WHERE id = ?", [id])
          return res.status(204).json({error:false, message:"se borro correctamente el casco "})
        }catch(error){
            return res.status(404).json({error:true, message:"El id no coincidio con ningun registro "})
        }
    }
    async crearCasco(req,res){
        try {
            const casco = {
                fecha_de_creacion: new Date()
            }
            const result = await pool.query("INSERT INTO registro_casco set ?", [casco])
            return res.status(201).json({error:false, message:"se creo un nuevo casco"})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:true, message:"ocurrio un error creando un nuevo casco"})
        }
    }
    async usoCasco(req,res){
        const {id, nombre, dni, fecha_inicio, horario_inicio,motivo} = req.body
        const {id_casco} = req.result;
        const newCasco = {
            nombre,dni,fecha_inicio,horario_inicio,motivo,id
        }
        try{
            let result = await pool.query("SELECT id from registro_casco where en_uso = 0")
            await pool.query("UPDATE registro_casco SET en_uso = 1 WHERE id = id_casco")
            await pool.query("INSERT INTO uso_casco set ?", [newCasco])
            return res.status(201).json({error:false,message:"se creo la reserva"})
        }catch(error){
            return res.status(500).json({error:true, message:"ocurrio un error creando la nueva reserva"})
        }
    }
}
