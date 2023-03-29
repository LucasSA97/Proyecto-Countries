const { Country, Activity } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { getData } = require("./utils");

const getCountries = async (query) => {
  const { name = "" } = query;                  //Le paso valor por defecto en caso que no venga name
  try {
    const array = [];
    let listCountries = await Country.findAll();//Trae los datos de la base a una varible
    if (!listCountries.length) {                // pregunto si la variable esta vacia
      array = await getData();                  // si esta vacia en un array extraigo los datos de la api al array
      await Country.bulkCreate(array);          // luego subo los datos extraidos a la bd
    }
    listCountries = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    return listCountries;
  } catch (error) {
    return error;
  }
};

const getCountryById = async (id) => {
  const country = await Country.findOne({
    where: { id },
    include: {
      model: Activity,
      through: {
        attributes: [],
      },
    },
  });
  if (!country) throw Error(`La ID: ${id} no existe`);
  return country;
};

module.exports = { getCountries, getCountryById };
