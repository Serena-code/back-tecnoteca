import {pool} from "../db/connection.js"
export default class computadoraController{
    constructor(){
        
    }
    async eliminarComputadora(req,res){
        const id = req.params.id
        console.log(id)
        try{
          const result = await  pool.query("DELETE FROM registro_computadoras WHERE id = ?", [id])
          return res.status(204).json({error:false, message:"se borro correctamente la computadora "})
        }catch(error){
            return res.status(404).json({error:true, message:"El id no coincidio con ningun registro "})
        }
    }
    async crearComputadora(req,res){
        try {
            const pc = {
                fecha_de_creacion: new Date()
            }
            const result = await pool.query("INSERT INTO registro_computadoras set ?", [pc])
            return res.status(201).json({error:false, message:"se creo una nueva computadora"})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:true, message:"ocurrio un error creando una nueva computadora"})
        }
    }
    async usoComputadora(req,res){
        const {id, nombre, dni, fecha_inicio, horario_inicio,motivo} = req.body
        const {id_computadora} = req.result;
        const newPc = {
            nombre,dni,fecha_inicio,horario_inicio,motivo,id
        }
        try{
            let result = await pool.query("SELECT id from registro_computadoras where en_uso = 0")
            await pool.query("UPDATE registro_computadoras SET en_uso = 1 WHERE id = id_computadora")
            await pool.query("INSERT INTO uso_computadoras set ?", [newPc])
            return res.status(201).json({error:false,message:"se creo la reserva"})
        }catch(error){
            return res.status(500).json({error:true, message:"ocurrio un error creando la nueva reserva"})
        }
    }

}
