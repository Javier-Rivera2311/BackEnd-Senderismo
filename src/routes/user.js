/* The code is creating a router object using the `Router` class from the `express` module. It then
defines two routes: */
import { Router } from 'express';

import { getUsuarios, setUsuario, changePassword, login2, nombreYedad,guias,descripciones,usuariosComentariosRurales,usuariosSinComentarios,rutasAntes2022,conteoRutas,promedioEdadMontañosas,guiasSinRutasRurales, rutasMontañosas2Comentarios, publicarRuta} from '../controllers/user.js';


const router = Router();

router.route('/ingresar')
    .post(setUsuario);

router.route('/mostrar')
    .get(getUsuarios);


router.route('/login2')
    .post(login2);

router.route('/publicarRuta')
    .post(publicarRuta);

router.route('/changePassword')
    .post(changePassword);


router.route('/userSin')
    .get(usuariosSinComentarios);


router.route('/guias')
    .get(guias);

router.route('/contrutas')
    .get(conteoRutas);

router.route('/descripcion')
    .get(descripciones);

router.route('/nombreYedad')
    .get(nombreYedad);

router.route('/antes2022rutas')
    .get(rutasAntes2022);

router.route('/error1')
    .get(usuariosComentariosRurales);

router.route('/promedioEdadMontanosas')
    .get(promedioEdadMontañosas);

router.route('/guiasSinRutasRurales')
    .get(guiasSinRutasRurales);

router.route('/rutasMontanosas2Comentarios')
    .get(rutasMontañosas2Comentarios);


export default router;






