const { Router } = require("express");
const { Sequelize } = require("sequelize");

//const { Country, Activity } = require("../db");
const {
  getCountries,
  getCountryById,
} = require("../controllers/countriesControllers");

const countryRouter = Router();

countryRouter.get("/", async (req, res) => {
  try {
    let totalCountries = await getCountries(req.query);
    res.status(200).send(totalCountries);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//:id (params)
countryRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await getCountryById(id);
    res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = countryRouter;

/* GET | /countries
Obtiene un arreglo de objetos, donde cada objeto es un país con toda su información.
📍 GET | /countries/:idPais
Esta ruta obtiene el detalle de un país específico. Es decir que devuelve un objeto con la información pedida en el detalle de un país.
El país es recibido por parámetro (ID de tres letras del país).
Tiene que incluir los datos de las actividades turísticas asociadas a este país.
📍 GET | /countries/name?="..."
Esta ruta debe obtener todos aquellos países que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
Debe poder buscarlo independientemente de mayúsculas o minúsculas.
Si no existe el país, debe mostrar un mensaje adecuado.*/
