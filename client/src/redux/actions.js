import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const ORDER_POPULATION = "ORDER_POPULATION";
export const FILTER_CONTINENTS = "FILTER_CONTINENTS";
export const FILTER_ALFABETIC = "FILTER_ALFABETIC";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_COUNTRIES_BY_ACTIVITIES = "FILTER_COUNTRIES_BY_ACTIVITIES";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";

export const getCountries = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: response.data,
    });
  };
};

export const getCountriesByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/activities");
    return dispatch({ type: GET_ACTIVITIES, payload: response.data });
  };
};

export const createActivity = (payload) => {
  return async function () {
    try {
      console.log(payload);
      const response = await axios.post(
        "http://localhost:3001/activities/",
        payload
      );
      //if (response) alert(response.data);
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getCountriesById = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/countries/${id}`);
    dispatch({
      type: GET_COUNTRY_BY_ID,
      payload: response.data,
    });
  };
};

//Filtros y Ordenamiento//

export const filterContinents = (countries) => {
  return {
    type: FILTER_CONTINENTS,
    payload: countries,
  };
};

export const filterCountriesByActivities = (activity) => {
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITIES,
    payload: activity,
  };
};

export const orderPopulation = (orderCountries) => {
  return {
    type: ORDER_POPULATION,
    payload: orderCountries,
  };
};

export const filterAlfabetic = (countries) => {
  return {
    type: FILTER_ALFABETIC,
    payload: countries,
  };
};
