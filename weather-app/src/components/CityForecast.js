import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import FiveDaysForecast from "./FiveDaysForecast";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
const apiKey = "KVtpG4o7CvFfDgGmJMNOwlTfjS8up9Pc";

const currentWeatherData = [
  {
    LocalObservationDateTime: "2021-10-26T19:45:00+08:00",
    EpochTime: 1635248700,
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
        Value: 17.2,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 63,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink:
      "http://www.accuweather.com/en/cn/kunming/106812/current-weather/106812?lang=en-us",
    Link: "http://www.accuweather.com/en/cn/kunming/106812/current-weather/106812?lang=en-us",
  },
];
const fiveWeatherData = {
  Headline: {
    EffectiveDate: "2021-10-27T01:00:00+08:00",
    EffectiveEpochDate: 1635267600,
    Severity: 4,
    Text: "Expect showers late Tuesday night",
    Category: "rain",
    EndDate: "2021-10-27T07:00:00+08:00",
    EndEpochDate: 1635289200,
    MobileLink:
      "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?lang=en-us",
    Link: "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?lang=en-us",
  },
  DailyForecasts: [
    {
      Date: "2021-10-26T07:00:00+08:00",
      EpochDate: 1635202800,
      Temperature: {
        Minimum: {
          Value: 54,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 70,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 4,
        IconPhrase: "Intermittent clouds",
        HasPrecipitation: false,
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "01",
        },
      },
      Night: {
        Icon: 12,
        IconPhrase: "Showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "08",
        },
      },
      Sources: ["AccuWeather", "Huafeng"],
      MobileLink:
        "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=1&lang=en-us",
      Link: "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=1&lang=en-us",
    },
    {
      Date: "2021-10-27T07:00:00+08:00",
      EpochDate: 1635289200,
      Temperature: {
        Minimum: {
          Value: 54,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 64,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 13,
        IconPhrase: "Mostly cloudy w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "03",
        },
      },
      Night: {
        Icon: 12,
        IconPhrase: "Showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "03",
        },
      },
      Sources: ["AccuWeather", "Huafeng"],
      MobileLink:
        "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=2&lang=en-us",
      Link: "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=2&lang=en-us",
    },
    {
      Date: "2021-10-28T07:00:00+08:00",
      EpochDate: 1635375600,
      Temperature: {
        Minimum: {
          Value: 52,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 64,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 12,
        IconPhrase: "Showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "03",
        },
      },
      Night: {
        Icon: 12,
        IconPhrase: "Showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "03",
        },
      },
      Sources: ["AccuWeather", "Huafeng"],
      MobileLink:
        "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=3&lang=en-us",
      Link: "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=3&lang=en-us",
    },
    {
      Date: "2021-10-29T07:00:00+08:00",
      EpochDate: 1635462000,
      Temperature: {
        Minimum: {
          Value: 52,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 66,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 12,
        IconPhrase: "Showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "03",
        },
      },
      Night: {
        Icon: 12,
        IconPhrase: "Showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "07",
        },
      },
      Sources: ["AccuWeather", "Huafeng"],
      MobileLink:
        "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=4&lang=en-us",
      Link: "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=4&lang=en-us",
    },
    {
      Date: "2021-10-30T07:00:00+08:00",
      EpochDate: 1635548400,
      Temperature: {
        Minimum: {
          Value: 52,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 61,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 8,
        IconPhrase: "Dreary",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "07",
        },
      },
      Night: {
        Icon: 7,
        IconPhrase: "Cloudy",
        HasPrecipitation: false,
        LocalSource: {
          Id: 7,
          Name: "Huafeng",
          WeatherCode: "02",
        },
      },
      Sources: ["AccuWeather", "Huafeng"],
      MobileLink:
        "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=5&lang=en-us",
      Link: "http://www.accuweather.com/en/cn/kunming/106812/daily-weather-forecast/106812?day=5&lang=en-us",
    },
  ],
};

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

function CityForecast({ cityKey, cityName }) {
  //* Get the currency from redux;
  const degreeCurrency = useSelector(state => state.degreeCurrency);

  const [currentWeather, setCurrentWeather] = useState(currentWeatherData);
  const [fiveDayForecast, setFiveDayForecast] = useState(fiveWeatherData);
  const [favoritesCities, setFavoritesCities] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getCurrentWeather = async () => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
    );
    setCurrentWeather(data);
  };

  const getFiveDayForecast = async () => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`
    );
    setFiveDayForecast(data);
  };

  const findIfFavorite = () => {
    const isCityFavorite = favoritesCities.some(
      city => city.cityKey === cityKey
    );
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
    const cities = JSON.parse(localStorage.getItem("favoritesCities")) || [];
    setFavoritesCities(cities);
    if (!cityKey) return;
    // getCurrentWeather();
    // getFiveDayForecast();
  }, []);

  useEffect(() => {
    findIfFavorite();
  }, [favoritesCities]);

  return (
    <Container className="forecast-container">
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
