import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import CitiesList from "./CitiesList";
import CityForecast from "./CityForecast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setCityName, setCityKey } from "../actions";
const apiKey = "dPHLlW14K7TNVcKjCI01aujLm8oGJyZA";

//* React Toastify
toast.configure();

const notifyOnlyEnglish = () => {
  toast.error("Only English Allowed!!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const notifyProbWithAPI = () => {
  toast.error("There is a Problem with out service, Come back later.", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const notifyCantFind = () => {
  toast.warn("Cant find  city", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

function Home() {
  const dispatch = useDispatch();
  const searchInput = useRef();

  const cityName = useSelector(state => state.cityName);
  const cityKey = useSelector(state => state.cityKey);

  const [filteredList, setFilteredList] = useState([]);
  const [userTyping, setUserTyping] = useState(false);

  const getCities = async () => {
    try {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`
      );
      if (data.length === 0) return notifyCantFind();
      setFilteredList(data);
    } catch (error) {
      console.log(error);
      notifyProbWithAPI();
    }
  };

  useEffect(() => {
    if (!cityName) {
      dispatch(setCityKey("215854"));
      dispatch(setCityName("Tel Aviv"));
      return setUserTyping(false);
    }

    getCities();
  }, [cityName]);

  const chooseCity = chosenCity => {
    searchInput.current.value = chosenCity.LocalizedName;
    searchInput.current.focus();
    setFilteredList([]);
    dispatch(setCityName(chosenCity.LocalizedName));
    dispatch(setCityKey(chosenCity.Key));
    setUserTyping(false);
  };

  //* This function set the city name, and allow only english letters.
  const setName = value => {
    value = value.replace(/[^A-Za-z]/gi, " ");
    if (value !== searchInput.current.value) {
      searchInput.current.value = "";
      searchInput.current.focus();
      setUserTyping(false);
      notifyOnlyEnglish();
      return;
    }
    dispatch(setCityName(value));
  };

  return (
    <Container className="search-field">
      <Row>
        <Col xs="4">
          <h1>Weather Forecast☀️🌡️</h1>
        </Col>
        <InputGroup>
          <Col xs="5">
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={e => {
                setUserTyping(true);
                setName(e.target.value);
              }}
              ref={searchInput}
              placeholder="Search for a city"
            />
          </Col>
        </InputGroup>
        {/* If user is typing - show him the list, else - forecast of chose city/tel aviv */}
        {userTyping ? (
          <Col xs="5">
            <CitiesList filteredList={filteredList} chooseCity={chooseCity} />
          </Col>
        ) : (
          <CityForecast cityKey={cityKey} cityName={cityName} />
        )}
      </Row>
    </Container>
  );
}

export default Home;
