const darkMode = (state = false, action) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      return !state;
    default:
      return state;
  }
};

export default darkMode;
