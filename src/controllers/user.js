import mysql2 from 'mysql2/promise';
import connectionConfig from '../database/connection.js';


const createConnection = async ( ) => {
    return await mysql2.createConnection(connectionConfig);
}




const getUsuarios = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT * FROM usuario where 1');
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

const setUsuario = async ( req, res ) => {
    try {
        const usuario = req.body; //en el cuerpo de la solicitud vamos a enviar data  'POST PUT'
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('INSERT INTO usuarios (ID,nombre,edad,numcontacto,correo,contraseña,) values (?,?,?,?,?,?)', [req.body.ID, req.body.nombre,req.body.edad,req.body.numcontacto,req.body.correo,req.body.contraseña] );
        await connection.end();

        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al ingresar usuarios",
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
        const [rows] = await connection.execute('SELECT U.nombre, U.edad FROM usuario U JOIN comentario C ON U.ID = C.ID JOIN ruta R ON C.ID_ruta = R.ID_ruta WHERE R.tipo_ruta = montañosa');
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
        const [rows] = await connection.execute('SELECT G.nombre, AVG(CAST(G.valoracion AS DECIMAL)) AS valoracion_promedio FROM guia G JOIN ruta R ON G.ID = R.ID_guia WHERE R.tipo_ruta = montañosa GROUP BY G.nombre HAVING AVG(CAST(G.valoracion AS DECIMAL)) > 4;');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer los guías que han recibido una valoración promedio superior a 4 en rutas montañosas",
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
        const [rows] = await connection.execute('SELECT R.ID_ruta, R.tipo_ruta FROM ruta R JOIN comentario C ON R.ID_ruta = C.ID_ruta WHERE C.fecha_publicacion < '2022-01-01';');
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
        const [rows] = await connection.execute('SELECT G.nombre FROM guia G LEFT JOIN ruta R ON G.ID = R.ID_guia WHERE R.ID_ruta IS NULL AND R.tipo_ruta = 'rural';');
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
        const [rows] = await connection.execute('SELECT AVG(U.edad) AS edad_promedio FROM usuario U JOIN comentario C ON U.ID = C.ID JOIN ruta R ON C.ID_ruta = R.ID_ruta WHERE R.tipo_ruta = 'montañosa';');
        await connection.end();
        
        
        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al obtener el promedio de edad de los usuarios que han dejado comentarios en rutas montañosas",
            code: error
        });
    }
}

/*Mostrar las rutas montañosas con al menos 2 comentarios y su promedio de valoración */

const rutasMontañosas2Comentarios = async ( req, res ) => {
    try {
        
        const connection = await createConnection();
        console.log("JSAH")
        const [rows] = await connection.execute('SELECT R.ID_ruta, AVG(CAST(G.valoracion AS DECIMAL)) AS valoracion_promedio FROM ruta R JOIN guia G ON R.ID_guia = G.ID JOIN comentario C ON R.ID_ruta = C.ID_ruta WHERE R.tipo_ruta = 'montañosa' GROUP BY R.ID_ruta HAVING COUNT(C.ID) >= 2;');
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
        const [rows] = await connection.execute('SELECT U.nombre FROM usuario U WHERE U.ID IN (SELECT ID_usuario FROM ruta WHERE tipo_ruta = 'rural') GROUP BY U.nombre HAVING COUNT(DISTINCT ID_ruta) = (SELECT COUNT(*) FROM ruta WHERE tipo_ruta = 'rural');');
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

export {
    
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
    usuariosComentariosRurales
}