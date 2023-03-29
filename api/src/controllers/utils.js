const axios = require("axios");
const { Country } = require("../db");

// Traemos todos los países desde la API restcountries con las propiedades solicitadas.
const getData = async () => {
  try {
    const countriesApi = await axios.get("https://restcountries.com/v3/all");
    const countriesApiInfo = await countriesApi.data.map((el) => {
      return {
        id: el.cca3,
        name: el.name.common,
        img: el.flags[1],
        continent: el.region,
        capital: el.capital ? el.capital[0] : "Unknown",
        population: el.population,
      };
    });
    // Guardarmos la info extraída en su base de datos (countries).
    const countriesDb = await Country.bulkCreate(countriesApiInfo);
    return countriesDb;
  } catch (error) {
    return error;
  }
};

module.exports = { getData };
