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
            return res.json({error:false, message:"se creo una nueva computadora"}).status(201)

        } catch (error) {
            console.log(error)
            return res.status(500).json({error:true, message:"ocurrio un error creando una nueva computadora"})
        }
    }
}