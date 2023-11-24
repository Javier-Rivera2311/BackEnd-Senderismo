import Sequelize from 'sequelize';
import sequelize from '../../database/connection-v2-sequelize.js';

const Cliente = sequelize.define('Cliente', {
  idCliente: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING(255),
    allowNull: true // Asumiendo que 'YES' en 'Nul' significa que el campo puede ser nulo
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true
  },
  numeroTelefono: {
    type: Sequelize.STRING(29),
    allowNull: true // Asumiendo que 'YES' en 'Nul' significa que el campo puede ser nulo
  },
  correo: {
    type: Sequelize.STRING(255),
    allowNull: true, // Asumiendo que 'YES' en 'Nul' significa que el campo puede ser nulo
    validate: {
      isEmail: true // Esto asegurará que el campo `correo` contenga un correo electrónico válido
    }
  }
}, {
  // Opciones adicionales
  tableName: 'cliente',
  timestamps: false, // Desactivamos los timestamps automáticos ya que estamos definiendo manualmente un campo 'timestamp'
});

export default Cliente;
