const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      season: {
        type: DataTypes.ENUM(
          "Summer",
          "Autumn",
          "Winter",
          "Spring",
          "All year"
        ),
        allowNull: false,
        defaultValue: "All year",
      },
    },
    {
      timestamps: false,
    }
  );
};

/*ID. *
Nombre. *
Dificultad (número del 1 al 5). *
Duración (en horas).
Temporada (Verano, Otoño, Invierno o Primavera). *
*/
