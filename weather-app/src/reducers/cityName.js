const cityName = (state = "Tel Aviv", action) => {
  switch (action.type) {
    case "SET_CITY_NAME":
      return action.payload;
    default:
      return state;
  }
};

export default cityName;
