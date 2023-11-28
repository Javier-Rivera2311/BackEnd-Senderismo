//aquí se construirá la tabla noSql

import mongoose from "mongoose"

const{Schema , model}= mongoose;

const publicarSchema = new Schema({
    id: {
        type: Number,
        required: true,
        maxlength: 255
    },

    nombre: {
        type: String,
        required: false,
        maxlength: 255
    },

    ubicacion: {
        type: String,
        required: false,
        maxlength: 255
    },

    dificultad: {
        type: String,
        required: false,
        maxlength: 255
    },
    tipo_de_ruta: {
        type: String,
        required: false,
        maxlength: 255
    },
    comentario: {
        type: String,
        required: false,
        maxlength: 255
    }
},{
    timestamps: {
        createdAt: 'timestamp', // Personaliza el nombre del campo de timestamp
        updatedAt: 'updatedAt'  // Personaliza el nombre del campo de actualización de timestamp
    }
});

export default model('Rutas', publicarSchema);