import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./Favorites";
import Home from "./Home";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { useSelector, useDispatch } from "react-redux";
import { changeToCelsius, changeToFahrenheit } from "../actions/";

function App() {
  const dispatch = useDispatch();
  const degreeCurrency = useSelector(state => state.degreeCurrency);

  const changeDegreeCurrency = () => {
    if (degreeCurrency === "Celsius") {
      return dispatch(changeToFahrenheit());
    }

    return dispatch(changeToCelsius());
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="favorites">Favorites</Nav.Link>
            <div className="switch-button">
              <BootstrapSwitchButton
                checked={false}
                onlabel="F°"
                offlabel="C°"
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
