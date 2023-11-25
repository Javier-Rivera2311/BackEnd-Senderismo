import mysql2 from 'mysql2/promise';
import connectionConfig from '../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createConnection = async ( ) => {
    return await mysql2.createConnection(connectionConfig);
}




const getUsuarios = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT * FROM login where 1');
        await connection.end();

        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer el usuarios",
            code: error
        });
    }
};

const setUsuario = async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
    // Validar que la contraseña cumpla con los requisitos
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'La contraseña debe tener al menos una mayúscula, una minúscula, un número, un carácter especial y ser de al menos 6 caracteres'
      });
    }      

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          error: 'Las contraseñas no coinciden'
        });
      }
  
      // Verificar si el correo electrónico ya existe en la base de datos
      const connection = await createConnection();
      const [rows] = await connection.execute('SELECT * FROM usuario WHERE email = ?', [email]);
      if (rows.length > 0) {
        await connection.end();
        return res.status(400).json({
          success: false,
          error: 'El correo electrónico ya está registrado'
        });
      }
  
      // Cifrar la contraseña antes de almacenarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar el nuevo registro en la base de datos
      const [insertResult] = await connection.execute('INSERT INTO usuario (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
      await connection.end();
  
      return res.status(200).json({
        success: true,
        usuarios: insertResult
      });
  
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: 'Problemas al ingresar usuarios',
        code: error
      });
    }
  };

const login = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT FROM usuarios nombre, contraseña');
        await connection.end();

        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer el usuarios",
            code: error
        });
    }
};

/*Obtener el nombre y la edad de todos los usuarios que han dejado comentarios en rutas montañosas*/
const nombreYedad = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT U.name, U.edad FROM login U JOIN comentario C ON U.ID = C.ID_comentario JOIN ruta R ON C.ID_comentario = R.ID_descripcion WHERE R.tipo_ruta = "montanosa";');
        await connection.end();

        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer los nombres y edades de los usuarios que han dejado comentarios en rutas montañosas",
            code: error
        });
    }
};

/* Encontrar los guías que han recibido una valoración promedio superior a 4 en rutas montañosas*/

const guias = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT G.nombre, AVG(CAST(G.valoracion AS DECIMAL)) AS valoracion_promedio FROM guia G JOIN ruta R ON G.ID = R.ID_guia WHERE R.tipo_ruta = "montanosa" GROUP BY G.nombre HAVING AVG(CAST(G.valoracion AS DECIMAL)) > 4;');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer los guías que han recibido una valoración promedio superior a 4 en rutas montanosas",
            code: error
        });
    }
}

/*Mostrar el ID y el contenido de todas las descripciones que se han utilizado en más de una ruta: */
const descripciones = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT D.ID_comentario, D.contenido FROM descripcion D JOIN ruta R ON D.ID_comentario = R.ID_descripcion GROUP BY D.ID_comentario, D.contenido HAVING COUNT(R.ID_ruta) > 1;');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer las descripciones que se han utilizado en más de una ruta",
            code: error
        });
    }
}
/*Encontrar los usuarios que no han dejado comentarios en ninguna ruta*/
const usuariosSinComentarios = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT U.ID, U.nombre FROM usuario U WHERE U.ID NOT IN (SELECT ID_usuario FROM ruta);');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer los usuarios que no han dejado comentarios en ninguna ruta",
            code: error
        });
    }
}

/*Obtener todas las rutas que tienen comentarios publicados antes del 2022*/

const rutasAntes2022 = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT R.ID_ruta, R.tipo_ruta FROM ruta R JOIN comentario C ON R.ID_ruta = C.ID_ruta WHERE C.fecha_publicacion < 2022-01-01;');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer las rutas que tienen comentarios publicados antes del 2022",
            code: error
        });
    }
}

/*Mostrar el número de rutas de cada tipo (montañosas, rurales, y ciudad) junto con su conteo */
const conteoRutas = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT tipo_ruta, COUNT(*) AS conteo FROM ruta GROUP BY tipo_ruta;');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al mostrar el número de rutas de cada tipo (montañosas, rurales, y ciudad) junto con su conteo",
            code: error
        });
    }
}

/*Encontrar los guías que no tienen rutas rurales */

const guiasSinRutasRurales = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT G.nombre FROM guia G LEFT JOIN ruta R ON G.ID = R.ID_guia WHERE R.ID_ruta IS NULL AND R.tipo_ruta = "rural";');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al encontrar los guías que no tienen rutas rurales",
            code: error
        });
    }
}

/*Obtener el promedio de edad de los usuarios que han dejado comentarios en rutas montañosas */
const promedioEdadMontañosas = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT AVG(U.edad) AS edad_promedio FROM usuario U JOIN comentario C ON U.ID = C.ID_comentario JOIN ruta R ON C.ID_ruta = R.ID_ruta WHERE R.tipo_ruta = "montanosa";');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al obtener el promedio de edad de los usuarios que han dejado comentarios en rutas montanosas",
            code: error
        });
    }
}

/*Mostrar las rutas montañosas con al menos 2 comentarios y su promedio de valoración */

const rutasMontañosas2Comentarios = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT R.ID_ruta, AVG(CAST(G.valoracion AS DECIMAL)) AS valoracion_promedio FROM ruta R JOIN guia G ON R.ID_guia = G.ID JOIN comentario C ON R.ID_ruta = C.ID_ruta WHERE R.tipo_ruta = "montanosa" GROUP BY R.ID_ruta HAVING COUNT(C.ID_comentario) >= 2;');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas mostrar las rutas montañosas con al menos 2 comentarios y su promedio de valoración",
            code: error
        });
    }
}

/*Encontrar los usuarios que han dejado comentarios en todas las rutas rurales */
const usuariosComentariosRurales = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT U.nombre FROM usuario U WHERE U.ID IN (SELECT ID_usuario FROM comentario WHERE ID_ruta IN (SELECT ID_ruta FROM ruta WHERE tipo_ruta = "rural")) GROUP BY U.nombre HAVING COUNT(DISTINCT comentario.id_ruta) = (SELECT COUNT(*) FROM ruta WHERE tipo_ruta = "rural")');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Error al encontrar los usuarios que han dejado comentarios en todas las rutas rurales",
            code: error
        });
    }
}

/* Ruta que me pidio el Javier para validar el login*/
const login2 = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const connection = await createConnection();
      const [rows] = await connection.execute('SELECT * FROM usuario WHERE email = ?', [email]);
      await connection.end();
  
      if (rows.length === 1) {
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Genera un token de autenticación
          const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1m' });
  
          return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            token: token  // Envía el token al cliente
          });
        } else {
          return res.status(401).json({
            success: false,
            error: "Correo electrónico o contraseña incorrectos"
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          error: "Correo electrónico o contraseña incorrectos"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: "Problemas al iniciar sesión",
        code: error
      });
    }
  };
  const changePassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const connection = await createConnection();
      const [rows] = await connection.execute('SELECT * FROM usuario WHERE email = ?', [email]);
  
      if (rows.length === 1) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.execute('UPDATE usuario SET password = ? WHERE email = ?', [hashedPassword, email]);
        await connection.end();
  
        return res.status(200).json({
          success: true,
          message: "Contraseña actualizada con éxito"
        });
      } else {
        await connection.end();
        return res.status(401).json({
          success: false,
          error: "Correo electrónico no encontrado"
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        error: "Problemas al actualizar la contraseña",
        code: error
      });
    }
  };
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
  };
  const RealizarRuta = async (req, res) => {
    try {
      const { usuario, ubicaciones_agregadas, fecha, guia } = req.body;
  
      // Validar que todos los campos necesarios estén presentes
      if (!usuario || !ubicaciones_agregadas || !fecha || !guia) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos'
        });
      }
  
      const connection = await createConnection();
  
      // Verificar si los IDs proporcionados existen en sus respectivas tablas
      const [usuarioResult] = await connection.execute('SELECT * FROM usuario WHERE id = ?', [usuario]);
      const [ubicacionesResult] = await connection.execute('SELECT * FROM publicar_rutas WHERE id = ?', [ubicaciones_agregadas]);
      const [guiaResult] = await connection.execute('SELECT * FROM guia WHERE id = ?', [guia]);
  
      if (usuarioResult.length === 0 || ubicacionesResult.length === 0 || guiaResult.length === 0) {
        await connection.end();
        return res.status(400).json({
          success: false,
          error: 'Uno o más IDs proporcionados no existen'
        });
      }
  
      // Insertar el nuevo registro en la base de datos
      const [insertResult] = await connection.execute('INSERT INTO ruta (usuario, ubicaciones_agregadas, fecha, guia) VALUES (?, ?, ?, ?)', [usuario, ubicaciones_agregadas, fecha, guia]);
      await connection.end();
  
      return res.status(200).json({
        success: true,
        RealizarRuta: insertResult
      });
  
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: 'Problemas al ingresar la ruta',
        code: error
      });
    }
  }
export {
    login2,
    getUsuarios,
    setUsuario,
    login,
    nombreYedad,
    guias,
    descripciones,
    usuariosSinComentarios,
    rutasAntes2022,
    conteoRutas,
    guiasSinRutasRurales,
    promedioEdadMontañosas,
    rutasMontañosas2Comentarios,
    usuariosComentariosRurales,
    changePassword,
    publicarRuta,
    RealizarRuta
}
