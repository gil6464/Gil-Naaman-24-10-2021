import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCityKey } from "../actions";
import { Redirect } from "react-router-dom";

const apiKey = "KVtpG4o7CvFfDgGmJMNOwlTfjS8up9Pc";
const dataFromAPI = [
  {
    LocalObservationDateTime: "2021-10-28T05:01:00+08:00",
    EpochTime: 1635368460,
    WeatherText: "Cloudy",
    WeatherIcon: 7,
    HasPrecipitation: false,
    PrecipitationType: null,
    LocalSource: {
      Id: 7,
      Name: "Huafeng",
      WeatherCode: "01",
    },
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 8.5,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 47,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink:
      "http://www.accuweather.com/en/cn/kaifeng/102677/current-weather/102677?lang=en-us",
    Link: "http://www.accuweather.com/en/cn/kaifeng/102677/current-weather/102677?lang=en-us",
  },
];

const pictures = {
  snow: "https://ssl.gstatic.com/onebox/weather/48/snow.png",
  cold: "https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png",
  warm: "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png",
  hot: "https://ssl.gstatic.com/onebox/weather/48/sunny.png",
};

const getForecastImage = temp => {
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

const getMockData = () => {
  return dataFromAPI;
};

function Favorites() {
  const dispatch = useDispatch();

  const degreeCurrency = useSelector(state => state.degreeCurrency);
  const [favoritesData, setFavoritesData] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const redirectToHome = cityKey => {
    dispatch(setCityKey(cityKey));
    setRedirect(true);
  };
  const getCurrentWeather = async cityKey => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
    );
    return data;
  };

  useEffect(() => {
    const favoritesList = JSON.parse(
      localStorage.getItem("favoritesCities") || []
    );
    if (favoritesList.length <= 0) return;
    // const citiesData = favoritesList.map(async city => {
    // city.currentWeather = await getCurrentWeather(city.cityKey);
    const citiesData = favoritesList.map(city => {
      city.currentWeather = getMockData();
      return city;
    });
    setFavoritesData(citiesData);
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="favorites">
        <h1>Favorites⭐</h1>
      </div>
      <Container className="favorites-container">
        <Row>
          {favoritesData.map((city, i) => {
            return (
              <Col key={i}>
                <Col>
                  <Button onClick={() => redirectToHome(city.cityKey)}>
                    {" "}
                    {city.cityName}
                  </Button>{" "}
                </Col>
                {degreeCurrency === "Celsius"
                  ? city.currentWeather[0].Temperature.Metric.Value + "C°"
                  : city.currentWeather[0].Temperature.Imperial.Value + "F°"}
                <img
                  src={getForecastImage(
                    city.currentWeather[0].Temperature.Metric.Value
                  )}
                  alt="weather"
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Favorites;
