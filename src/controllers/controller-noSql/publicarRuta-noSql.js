import mongoose from 'mongoose';
import Publicar from '../../Models/Models-Nosql/publicarRutas.js';
import Publicacion from '../../Models/Models-Nosql/publicarRutas.js';



const crearPublicacion = async ( req, res, next) => {    
    try {
       
        const PublicarRutas = new Publicar(req.body);
        await PublicarRutas.save();

        res.status(200).json({
            success: true,
            message: "Publicacion creada en mongodb"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        });
    };
};

const listarPublicaciones = async (req, res, next) => {
    try {
        const publicacion = await Publicar.findById(req.params.id);
        res.json(publicaciones);
        
    } catch (error) {
        console.log(error);
        res.json({
            error: error
        });
    };
};

const listarPublicacion = async (req, res, next) => {
    try {
        const { id } = req.body;
        const publicacion = await Publicar.findById(req.body);
        res.json(publicacion);
    } catch (error) {
        console.log(error);
        res.json({
            error: error
        });
    };
};

const actualizarPublicacion = async (req, res, next) => {
    try {
       
        const { nombre, ubicacion, dificultad, tipo_de_ruta, comentario } = req.body;
        const newPublicacion = {nombre, ubicacion, dificultad, tipo_de_ruta, comentario };
        /*await Publicar.findByIdAndDelete(req.params.id);
        await Publicar.findByIdAndUpdate(req.params.id, newPublicacion);
        res.json({
            status: "Publicacion anterior eliminada y actualizada"
        });*/
        
        const filter = { _id: mongoose.Types.ObjectId(id) }; // Convierte el ID a ObjectId
        const updatedPublicacion = await Publicacion.findOneAndReplace(filter, newPublicacion, { new: true });

        if (!updatedPublicacion) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        res.json({
        status: 'Publicación actualizada correctamente',
        updatedPublicacion,
        });


    } catch (error) {
        console.log(error);
        res.json({
            error: error
        });
    };
};

const eliminarPublicacion = async (req, res, next) => {
    try {
       
        await Publicar.findByIdAndRemove(req.params.id);
        res.json({
            status: "Publicacion eliminada"
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error
        });
    };

};

export default{
   
    crearPublicacion,
    listarPublicaciones,
    listarPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
};
