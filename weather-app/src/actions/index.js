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
