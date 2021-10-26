const degreeCurrency = (state = "Celsius", action) => {
  switch (action.type) {
    case "FAHRENHEIT":
      return "Fahrenheit";
    case "CELSIUS":
      return "Celsius";
    default:
      return state;
  }
};

export default degreeCurrency;
