import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
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

function Favorites() {
  const [favoritesData, setFavoritesData] = useState([]);

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
    //   city.currentWeather = await getCurrentWeather(city.cityKey);
    //   return city;
    // });
    console.log(citiesData);
    setFavoritesData(citiesData);
  }, []);

  // useEffect(() => {
  //   console.log(favoritesData);
  // }, [favoritesData]);

  return (
    <>
      <div className="favorites">
        <h1>Favorites⭐</h1>
      </div>
      <Container className="favorites-container">
        <Row>
          {favoritesData.map((city, i) => {
            return <Col key={i}>{city.cityName}</Col>;
          })}
        </Row>
      </Container>
    </>
  );
}

export default Favorites;
