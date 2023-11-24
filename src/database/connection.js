import mysql2 from 'mysql2/promise'; // Importar la versión de promesa de mysql2 para uso de async/await
import functionsCreate from './tablas.js';

import values from '../const/constSQL.js';

const connectionConfig = {
    host: values.HOST,
    user: values.USER,
    database: values.DATABASE,
    password: values.PASSWORD // Asegúrate de tener tu contraseña aquí
};

const connection = await mysql2.createConnection({
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password,
});

// Usar la versión de promesa de mysql2
const main = async () => {

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`);
    console.log('Base de datos creada o ya existente');

    await connection.query(`USE ${connectionConfig.database}`);
    console.log(`Usando la base de datos ${connectionConfig.database}`);

    // Aquí puedes llamar a tus funciones para crear las tablas.
    await functionsCreate.crearTableCliente( connection );
    await functionsCreate.crearTableProducto( connection );
    await functionsCreate.crearTableCarrito( connection );
    await functionsCreate.crearTableProductoEnCarrito( connection );
};

main().catch(err => {
    console.error('Error:', err);
});


export default connection;