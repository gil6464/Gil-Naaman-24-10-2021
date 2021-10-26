import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Container, Row, Col } from "react-bootstrap";
import CitiesList from "./Cities";

const list = ["shir", "shiran", " gil", "or", "nir"];

function Home() {
  const searchInput = useRef();
  const [city, setCity] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const data = list.filter(search => {
      return search.toLowerCase().includes(city);
    });
    setFilteredList(data);
  }, [city]);

  const chooseCity = chosenCity => {
    searchInput.current.value = chosenCity;
    searchInput.current.focus();
    setFilteredList([]);
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
              onChange={e => setCity(e.target.value)}
              ref={searchInput}
            />
          </Col>
        </InputGroup>
        <Col xs="5">
          <CitiesList filteredList={filteredList} chooseCity={chooseCity} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
