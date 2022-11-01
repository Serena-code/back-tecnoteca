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
    async listarSalas(req,res){
        try {
            let result = await pool.query("SELECT * from registro_salas")
            return res.status(201).json({error:false,message:result})
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:true, message:"ocurrio un error listando las salas"})
            
        }
    }
    
    
    async reservarSalas(req,res){
        try {
            const { nombre, dni, fecha_inicio, horario_inicio,motivo, cantidad_salas} = req.body
            const registro = {
                nombre,
                dni,
                fecha_inicio, horario_inicio,motivo,cantidad_salas:1,
                
            }

            let listIds = await  pool.query("SELECT id from registro_salas where en_uso = 0")
            if(listIds.length == 0){
                return res.status(402).json({error:false,message:"no hay salas disponibles"})
            }
            registro.id_salas = listIds[0].id
            await pool.query("UPDATE registro_salas SET en_uso = 1 WHERE id = ?",[listIds[0].id])
            await pool.query("INSERT INTO uso_salas set ?", [registro])
            return res.status(201).json({error:false,message:"se creo la reserva"})

            
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:false,message:"error creando la reserva"})
        }
    }
    async reservasSalasListar (req,res){
        try {
            let result = await pool.query("SELECT * from uso_salas")
            return res.status(201).json({error:false,message:result})
        } catch (error) {
            console.error(error)
            return res.status(201).json({error:true,message:result})
        }
    }
    async reservasSalasEliminar (req,res){
        const id = req.params.id
        console.log(id)
        try{
          const result = await  pool.query("DELETE FROM uso_salas WHERE id = ?", [id])
          return res.status(204).json({error:false, message:"se borro correctamente la reserva "})
        }catch(error){
            console.error(error)
            return res.status(404).json({error:true, message:"El id no coincidio con ninguna reserva"})
        }
        
    }


}