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

router.route('/userSin')
    .get(usuariosSinComentarios);

router.route('/error')
    .get(guias);

router.route('/contrutas')
    .get(conteoRutas);

router.route('error')
    .post(descripciones);

router.route('/error')
    .get(nombreYedad);

router.route('/antes2022rutas')
    .get(rutasAntes2022);

router.route('/usuariosComentariosRurales')
    .get(usuariosComentariosRurales);

router.route('/error')
    .get(promedioEdadMontañosas);

router.route('/guiasSinRutasRurales')
    .get(guiasSinRutasRurales);

router.route('/error')
    .get(rutasMontañosas2Comentarios);


export default router;






