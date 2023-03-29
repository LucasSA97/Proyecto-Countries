import {
  GET_COUNTRIES,
  ORDER_POPULATION,
  FILTER_CONTINENTS,
  FILTER_ALFABETIC,
  GET_COUNTRIES_BY_NAME,
  GET_ACTIVITIES,
  FILTER_COUNTRIES_BY_ACTIVITIES,
  GET_COUNTRY_BY_ID,
} from "./actions";

const initialState = {
  countries: [],
  filteredCountries: [],
  countryID: [],
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };

    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        filteredCountries: action.payload,
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryID: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case FILTER_COUNTRIES_BY_ACTIVITIES:
      const filteredActivity = state.activities.find(
        (activity) => activity.name === action.payload
      );
      const filterCountries = filteredActivity.Countries;
      return {
        ...state,
        filteredCountries: filterCountries,
      };

    case ORDER_POPULATION:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case FILTER_CONTINENTS:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case FILTER_ALFABETIC:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
