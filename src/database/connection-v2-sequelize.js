import Sequelize from 'sequelize';
import values from '../const/const.js';

const sequelize = new Sequelize(
    values.DATABASE,
    values.USER,
    values.PASSWORD,
    {
        host: values.HOST,
        dialect:'mysql'

    }
);

sequelize.authenticate().then(() => {
        console.log('Sequelize Conectado');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    }
);


export default sequelize;