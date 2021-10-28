export const changeToCelsius = () => {
  return {
    type: "CELSIUS",
  };
};

export const changeToFahrenheit = () => {
  return {
    type: "FAHRENHEIT",
  };
};

export const setCityKey = cityKey => {
  return {
    type: "SET_CITY_KEY",
    payload: cityKey,
  };
};

export const setCityName = cityName => {
  return {
    type: "SET_CITY_NAME",
    payload: cityName,
  };
};

export const setDarkMode = () => {
  return {
    type: "SET_DARK_MODE",
  };
};
