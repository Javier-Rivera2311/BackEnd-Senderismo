import ClientesModel from '../../../models/cliente/nosql.js';
const noSqlCliente = {};

noSqlCliente.crearCliente = async ( req, res, next) => {    
    try {
        
        const cliente = new ClientesModel(req.body);
        await cliente.save();

        return res.status(200).json({
            success: true,
            message: "Cliente creado en mongodb"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    };
};


noSqlCliente.listarClientes = async ( req, res, next) => {    
    try {
        
        const clientes = await ClientesModel.find({}).exec();

        if(clientes.length > 0)
            return res.status(200).json({
                success: true,
                clientes,
                message: "listando clientes en mongodb"
            });
            
        return res.status(404).json({
            success: false,
            message: "No hay Clientes en mongodb"
        });

    } catch ( error ) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error
        });
    };
};


noSqlCliente.listarById = async (req, res, next) => {
    try {
        const { idCliente } = req.params;

        const cliente = await ClientesModel.findById( idCliente );
        
        if( cliente ){
            return res.status(200).json({
                success: true,
                cliente
            });
        };

        return res.status(404).json({
            success: false,
            error:"Cliente no encontrado"
        });

    } catch ( error ) {
        console.log( error );
        return res.status(404).json({
            success: false,
            error:"Cliente no encontrado"
        });
    };
};

export default noSqlCliente;