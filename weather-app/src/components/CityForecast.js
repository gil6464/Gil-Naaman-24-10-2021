import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import FiveDaysForecast from "./FiveDaysForecast";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";

const apiKey = "dPHLlW14K7TNVcKjCI01aujLm8oGJyZA";

const calcCelsius = temp => {
  return Math.round((temp - 32) * (5 / 9));
};

const pictures = {
  snow: "https://ssl.gstatic.com/onebox/weather/48/snow.png",
  cold: "https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png",
  warm: "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png",
  hot: "https://ssl.gstatic.com/onebox/weather/48/sunny.png",
};

const getForecastImage = temp => {
  temp = calcCelsius(temp);
  if (temp < 0) {
    return pictures.snow;
  }
  if (temp < 10) {
    return pictures.cold;
  }
  if (temp < 20) {
    return pictures.warm;
  }
  return pictures.hot;
};

toast.configure();
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
function CityForecast({ cityKey, cityName }) {
  //* Get the currency from redux;
  const degreeCurrency = useSelector(state => state.degreeCurrency);
  const isDarkMode = useSelector(state => state.darkMode);

  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [favoritesCities, setFavoritesCities] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const fiveDaysData = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`
      );
      const currentWeatherData = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
      );
      setFiveDayForecast(fiveDaysData.data);
      setCurrentWeather(currentWeatherData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      notifyProbWithAPI();
    }
  };

  const findIfFavorite = () => {
    const isCityFavorite = favoritesCities.some(city => {
      return city.cityKey === cityKey;
    });
    setIsFavorite(isCityFavorite);
  };

  const setFavorite = () => {
    let newFavorites = [];
    if (isFavorite) {
      newFavorites = favoritesCities.filter(city => city.cityKey !== cityKey);
    } else {
      newFavorites = [...favoritesCities, { cityKey, cityName }];
    }
    localStorage.setItem("favoritesCities", JSON.stringify(newFavorites));
    setFavoritesCities(newFavorites);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    getData();

    const cities = JSON.parse(localStorage.getItem("favoritesCities")) || [];
    setFavoritesCities(cities);
    findIfFavorite();
  }, []);

  useEffect(() => {
    findIfFavorite();
  }, [favoritesCities]);
  return loading ? (
    <Spinner animation="border" role="status" />
  ) : (
    <Container
      className={
        isDarkMode ? "forecast-container dark-mode" : "forecast-container"
      }
    >
      <Row className="today-container">
        <Col xs={12} md={8}>
          {cityName} Forecast! Today Current Weather :
          {degreeCurrency === "Celsius"
            ? currentWeather[0].Temperature.Metric.Value + "C°"
            : currentWeather[0].Temperature.Imperial.Value + "F°"}
          <img
            src={getForecastImage(currentWeather[0].Temperature.Imperial.Value)}
            alt="weather"
          />
        </Col>
        <Col xs={5} md={3}>
          <Button
            onClick={() => {
              setFavorite();
            }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            {isFavorite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
          </Button>
        </Col>
      </Row>
      <FiveDaysForecast
        fiveDayForecast={fiveDayForecast}
        calcCelsius={calcCelsius}
        getForecastImage={getForecastImage}
      />
    </Container>
  );
}

export default CityForecast;
