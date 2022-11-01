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
    async listarCasco(req,res){
        try {
            let result = await pool.query("SELECT * from registro_casco")
            return res.status(201).json({error:false,message:result})
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:true, message:"ocurrio un error listando el casco"})
            
        }
    }
    
    
    async reservarCasco(req,res){
        try {
            const { nombre, dni, fecha_inicio, horario_inicio,motivo, cantidad_cascos} = req.body
            const registro = {
                nombre,
                dni,
                fecha_inicio, horario_inicio,motivo,cantidad_cascos:1,
                
            }

            let listIds = await  pool.query("SELECT id from registro_casco where en_uso = 0")
            if(listIds.length == 0){
                return res.status(402).json({error:false,message:"no hay cascos disponibles"})
            }
            registro.id_casco = listIds[0].id
            await pool.query("UPDATE registro_casco SET en_uso = 1 WHERE id = ?",[listIds[0].id])
            await pool.query("INSERT INTO uso_casco set ?", [registro])
            return res.status(201).json({error:false,message:"se creo la reserva"})

            
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:false,message:"error creando la reserva"})
        }
    }
    async reservasCascoListar (req,res){
        try {
            let result = await pool.query("SELECT * from uso_casco")
            return res.status(201).json({error:false,message:result})
        } catch (error) {
            console.error(error)
            return res.status(201).json({error:true,message:result})
        }
    }

    async reservasCascoEliminar (req,res){
        const id = req.params.id
        console.log(id)
        try{
          const result = await  pool.query("DELETE FROM uso_casco WHERE id = ?", [id])
          return res.status(204).json({error:false, message:"se borro correctamente la reserva "})
        }catch(error){
            console.error(error)
            return res.status(404).json({error:true, message:"El id no coincidio con ninguna reserva"})
        }
        
    }
}
