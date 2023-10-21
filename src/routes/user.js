/* The code is creating a router object using the `Router` class from the `express` module. It then
defines two routes: */
import { Router } from 'express';

import { crearUsuario, getUsuarios,setUsuario,login } from '../controllers/user.js';




export default router;


router.route('ingresar/Usuarios')
    .post( setUsuario );
router.route('Mostrar/Usuarios')
    .get( getUsuarios );
route.route('Crear/Usuarios')
    .get( crearUsuario );
route.route('Login/Usuarios')
    .get( login );