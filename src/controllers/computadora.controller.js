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
    
    async listarComputadoras(req,res){
        try {
            let result = await pool.query("SELECT * from registro_computadoras")
            return res.status(201).json({error:false,message:result})
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:true, message:"ocurrio un error listando las computadoras"})
            
        }
    }
    
    
    async reservarComputadora(req,res){
        try {
            const { nombre, dni, fecha_inicio, horario_inicio,motivo, cantidad_computadoras} = req.body
            const registro = {
                nombre,
                dni,
                fecha_inicio, horario_inicio,motivo,cantidad_computadoras:1,
                
            }

            let listIds = await  pool.query("SELECT id from registro_computadoras where en_uso = 0")
            if(listIds.length == 0){
                return res.status(402).json({error:false,message:"no hay computadoras disponibles"})
            }
            registro.id_computadora = listIds[0].id
            await pool.query("UPDATE registro_computadoras SET en_uso = 1 WHERE id = ?",[listIds[0].id])
            await pool.query("INSERT INTO uso_computadoras set ?", [registro])
            return res.status(201).json({error:false,message:"se creo la reserva"})

            
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:false,message:"error creando la reserva"})
        }
    }
    async reservasListar (req,res){
        try {
            let result = await pool.query("SELECT * from uso_computadoras")
            return res.status(201).json({error:false,message:result})
        } catch (error) {
            console.error(error)
            return res.status(201).json({error:true,message:result})
        }
    }
    async reservasEliminar (req,res){
        const id = req.params.id
        console.log(id)
        try{
          const result = await  pool.query("DELETE FROM uso_computadoras WHERE id = ?", [id])
          return res.status(204).json({error:false, message:"se borro correctamente la reserva "})
        }catch(error){
            console.error(error)
            return res.status(404).json({error:true, message:"El id no coincidio con ninguna reserva"})
        }
        
    }

}
