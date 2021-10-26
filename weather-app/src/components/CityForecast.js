import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

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

function CityForecast({ cityKey, cityName }) {
  const [celsius, setCelsius] = useState(true);

  const calcCelsius = temp => {
    return Math.round((temp - 32) * (5 / 9));
  };
  const getCurrentWeather = async () => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
    );
    console.log(data);
  };
  const getFiveDayForecast = async () => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`
    );
    console.log(data);
  };
  useEffect(() => {
    if (!cityKey) return;
    // getCurrentWeather();
    // getFiveDayForecast();
  }, []);

  return (
    <Container className="forecast-container">
      <Row>
        <Col>
          {cityName} Forecast! Today Current Weather :{" "}
          {celsius
            ? currentWeatherData[0].Temperature.Metric.Value + "C°"
            : currentWeatherData[0].Temperature.Imperial.Value + "F°"}
          <BootstrapSwitchButton
            checked={false}
            onlabel="F°"
            offlabel="C°"
            onstyle="outline-primary"
            offstyle="outline-primary"
            onChange={() => setCelsius(!celsius)}
          />
        </Col>
      </Row>
      <Row>
        {fiveWeatherData.DailyForecasts.map((day, i) => {
          console.log(day);
          return (
            <Col key={i}>
              {" "}
              {day.Temperature.Maximum.Value}-{day.Temperature.Minimum.Value}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default CityForecast;
