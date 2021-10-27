import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const calcDay = date => {
  const day = new Date(date);
  return weekDays[day.getDay()];
};

function FiveDaysForecast({ fiveDayForecast, getForecastImage, calcCelsius }) {
  const degreeCurrency = useSelector(state => state.degreeCurrency);

  return (
    <Container>
      <Row>
        {fiveDayForecast.DailyForecasts.map((day, i) => {
          return (
            <Col key={i}>
              <Col>{calcDay(day.Date)}</Col>
              {degreeCurrency === "Celsius"
                ? calcCelsius(day.Temperature.Minimum.Value) +
                  "-" +
                  calcCelsius(day.Temperature.Maximum.Value) +
                  "C°"
                : day.Temperature.Minimum.Value +
                  "-" +
                  day.Temperature.Maximum.Value +
                  "F°"}
              <img
                src={getForecastImage(day.Temperature.Maximum.Value)}
                alt="weather"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default FiveDaysForecast;
