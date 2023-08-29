const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID, //ID alfanumericos 
      defaultValue: DataTypes.UUIDV4, //Crea un número aleatorio de id
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //Puntos de vida
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    //Puntos de ataque
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    //Puntos de defensa
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    //Velocidad
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    },
    //Altura
    height: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    }, 
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: '1'
    },
    //Crear nuevo pokemon
    createdPokemon:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
    {
    timestamps: false, //No tener fecha y hora de la cración
    freezeTableName: true //Nombre de la base de datos === al modelo
    },
  );
};


/* Datos obligatorios a ingresar:
    + name, 
    + hp,
    + defense
    + attack */
