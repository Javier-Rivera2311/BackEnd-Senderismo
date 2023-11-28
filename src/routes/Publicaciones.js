
import noSqlPublica from '../controllers/controller-noSql/publicarRuta-noSql.js';
import {Router} from 'express'

const router = Router();

router.route('/publicarRuta/:typeBd')
    .post(noSqlPublica.crearPublicacion)

router.route('/mostrar/:typeBd')
    .get(noSqlPublica.listarPublicaciones)

/*router.route('/mostrarVarios/:typeBd')
    .get(noSqlPublica.listarPublicaciones)*/

router.route('/update/:typeBd')
    .put(noSqlPublica.actualizarPublicacion)
    //.delete(noSqlPublica.actualizarPublicacion)
router.route('/updatePut/:typeBd')
    .post(noSqlPublica.actualizarPublicacion)
router.route('/delete/:typeBd')
    .delete(noSqlPublica.eliminarPublicacion)

export default router;