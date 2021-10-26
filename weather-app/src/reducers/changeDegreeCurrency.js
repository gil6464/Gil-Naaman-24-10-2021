const changeDegreeCurrency = (state = "Celsius", action) => {
  switch (action.type) {
    case "Fahrenheit":
      return "Fahrenheit";
    case "Celsius":
      return "Celsius";
    default:
      return state;
  }
};

export default changeDegreeCurrency;
