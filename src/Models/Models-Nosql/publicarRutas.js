//aquí se construirá la tabla noSql

import mongoose from "mongoose"

const{Schema , model}= mongoose;

const publicarSchema = new Schema({
    id: {
        type: Number,
        required: true,
        maxlength: 255
    },

    username: {
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
/*
export default model("Clientes", clienteSchema);

esto es un esquema de noSql
    const clienteSchema = new Schema({
    nombre: {
      type: String,
      required: true, // Equivalente a allowNull: false en Sequelize
      maxlength: 255
    },
    direccion: {
      type: String,
      required: false, // Este campo puede ser nulo
      maxlength: 255
    },
    numeroTelefono: {
      type: String,
      required: false, // Este campo puede ser nulo
      maxlength: 29
    },
    correo: {
      type: String,
      required: false, // Este campo puede ser nulo
      maxlength: 255,
    }
  }, {
    timestamps: {
      createdAt: 'timestamp' // Personaliza el nombre del campo de timestamp
    }
  });

export default model("Clientes", clienteSchema);






const publicarRuta = async (req, res) => {
  try {
    const { nombre, ubicacion, dificultad, tipo_de_ruta, comentario } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !ubicacion || !dificultad || !tipo_de_ruta || !comentario) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son requeridos'
      });
    }

    const connection = await createConnection();
    // Insertar el nuevo registro en la base de datos
    const [insertResult] = await connection.execute('INSERT INTO publicar_rutas (nombre, ubicacion, dificultad, tipo_de_ruta, comentario) VALUES (?, ?, ?, ?, ?)', [nombre, ubicacion, dificultad, tipo_de_ruta, comentario]);
    await connection.end();

    return res.status(200).json({
      success: true,
      publicarRuta: insertResult
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      error: 'Problemas al ingresar la ruta',
      code: error
    });
  }
};*/