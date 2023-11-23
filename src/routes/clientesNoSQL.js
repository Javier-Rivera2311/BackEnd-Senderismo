import { Router } from "express";
import sqlCliente from '../controllers/cliente/sql/cliente.js'; 
import noSqlCliente from '../controllers/cliente/nosql/cliente.js'; 

const router = Router();

router.route('/create/:typeBd')
    .post(sqlCliente.crearCliente, noSqlCliente.crearCliente);

router.route('/all/:typeBd')
    .get(sqlCliente.listarClientes, noSqlCliente.listarClientes);

router.route('/byId/:typeBd/:idCliente')
    .get(sqlCliente.listarById, noSqlCliente.listarClientes);


export default router;


// /cliente/create/sql o /mongodb