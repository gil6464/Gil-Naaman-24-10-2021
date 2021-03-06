import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Favorites from "./Favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { RiFahrenheitLine, RiCelsiusLine } from "react-icons/ri";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { changeToCelsius, changeToFahrenheit, setDarkMode } from "../actions/";

function App() {
  const dispatch = useDispatch();
  const degreeCurrency = useSelector(state => state.degreeCurrency);
  const isDarkMode = useSelector(state => state.darkMode);

  const changeDegreeCurrency = () => {
    if (degreeCurrency === "Celsius") {
      localStorage.setItem("degreeCurrency", "Fahrenheit");
      return dispatch(changeToFahrenheit());
    }
    localStorage.setItem("degreeCurrency", "Celsius");
    return dispatch(changeToCelsius());
  };

  const changeDarkMode = () => {
    if (isDarkMode === false) {
      localStorage.setItem("darkMode", true);
      return dispatch(setDarkMode());
    }
    localStorage.setItem("darkMode", false);
    return dispatch(setDarkMode());
  };

  //* When app mounts, handle degree currency and dark mode.
  useEffect(() => {
    //* Solve some issues with local storage in production.
    const favoritesCities = localStorage.getItem("favoritesCities");
    if (!favoritesCities)
      localStorage.setItem("favoritesCities", JSON.stringify([]));
    console.log(favoritesCities);
    const userDegreeCurrency =
      localStorage.getItem("degreeCurrency") || "Celsius";
    if (userDegreeCurrency === "Celsius") {
      dispatch(changeToCelsius());
    } else {
      dispatch(changeToFahrenheit());
    }
    const darkMode = localStorage.getItem("darkMode") || false;
    if (darkMode === "true") {
      dispatch(setDarkMode());
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        bg={isDarkMode ? "dark" : "light"}
        expand="lg"
        variant={isDarkMode ? "dark" : "light"}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="dark-mode-switch-button">
              <BootstrapSwitchButton
                checked={isDarkMode}
                onlabel={<BsLightbulbOff />}
                offlabel={<BsLightbulb />}
                onstyle="outline-primary"
                offstyle="outline-primary"
                onChange={() => changeDarkMode()}
              />
            </div>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="favorites">Favorites</Nav.Link>
            <div className="degree-switch-button">
              <BootstrapSwitchButton
                checked={degreeCurrency !== "Celsius"}
                onlabel={<RiFahrenheitLine />}
                offlabel={<RiCelsiusLine />}
                onstyle="outline-primary"
                offstyle="outline-primary"
                onChange={() => changeDegreeCurrency()}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      <Style />
    </div>
  );
}

function Style() {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center w-100 h-100">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="btn-group my-5"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
