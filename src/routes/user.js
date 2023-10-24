/* The code is creating a router object using the `Router` class from the `express` module. It then
defines two routes: */
import { Router } from 'express';

import { getUsuarios, setUsuario, login, login2, nombreYedad,guias,descripciones,usuariosComentariosRurales,usuariosSinComentarios,rutasAntes2022,conteoRutas,promedioEdadMontañosas,guiasSinRutasRurales, rutasMontañosas2Comentarios,} from '../controllers/user.js';


const router = Router();

router.route('/ingresar')
    .post(setUsuario);

router.route('/mostrar')
    .get(getUsuarios);

router.route('/login')
    .get(login);

router.route('/login2')
    .post(login2);

export default router;






