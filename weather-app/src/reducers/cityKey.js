const cityKey = (state = "215854", action) => {
  switch (action.type) {
    case "SET_CITY_KEY":
      return action.payload;
    default:
      return state;
  }
};

export default cityKey;
