const functions = {};

//main de procesamiento de querys de creacion de tablas
const sendQuery = async ( connection, nameTable, query ) => {
    try {
        await connection.query(query);
        // console.log(`Tabla ${nameTable} creada con exito!`)
    } catch (error) {
       
        if(error?.errno === 1050){
            // return console.log(`Tabla ${nameTable} ya estaba creada!`)
            return 1;
        }
        console.log("Error: ", error)
    }
}

functions.crearTableCliente = async ( connection ) => {
    
    const query = `CREATE TABLE Cliente (
        idCliente INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        direccion VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        numeroTelefono VARCHAR(20),
        correo VARCHAR(255)
    );
    `

    await sendQuery(connection, "Cliente", query);

};

functions.crearTableProducto  = async ( connection ) => {
    
    const query = `CREATE TABLE Producto (
        idProducto INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        categoria VARCHAR(255),
        oferta BOOLEAN,
        porcentajeOferta DECIMAL(5, 2)
    );
    `

    await sendQuery(connection, "Producto ", query);

};
functions.crearTableCarrito   = async ( connection ) => {
    
    const query = `CREATE TABLE Carrito (
        idCarrito INT PRIMARY KEY AUTO_INCREMENT,
        idCliente INT,
        pagado BOOLEAN DEFAULT FALSE,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        idTransaccion VARCHAR(255),
        metodoDePago VARCHAR(50),
        envio BOOLEAN,
        FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
    );
    `

    await sendQuery(connection, "Carrito", query);

};
functions.crearTableProductoEnCarrito = async ( connection ) => {
    
    const query = `CREATE TABLE ProductoEnCarrito (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idCarrito INT,
        idProducto INT,
        cantidad INT,
        FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito),
        FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
    );
    `
    await sendQuery(connection, "ProductoEnCarrito ", query);
};

export default functions;