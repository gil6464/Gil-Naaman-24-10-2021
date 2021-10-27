import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import CitiesList from "./CitiesList";
import CityForecast from "./CityForecast";
//* React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiKey = "KVtpG4o7CvFfDgGmJMNOwlTfjS8up9Pc";

const data = [
  {
    Version: 1,
    Key: "113487",
    Type: "City",
    Rank: 10,
    LocalizedName: "Kinshasa",
    Country: {
      ID: "CD",
      LocalizedName: "Democratic Republic of the Congo",
    },
    AdministrativeArea: {
      ID: "KN",
      LocalizedName: "Kinshasa",
    },
  },
  {
    Version: 1,
    Key: "106812",
    Type: "City",
    Rank: 11,
    LocalizedName: "Kunming",
    Country: {
      ID: "CN",
      LocalizedName: "China",
    },
    AdministrativeArea: {
      ID: "YN",
      LocalizedName: "Yunnan",
    },
  },
  {
    Version: 1,
    Key: "206690",
    Type: "City",
    Rank: 11,
    LocalizedName: "Kolkata",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "WB",
      LocalizedName: "West Bengal",
    },
  },
  {
    Version: 1,
    Key: "261158",
    Type: "City",
    Rank: 11,
    LocalizedName: "Karachi",
    Country: {
      ID: "PK",
      LocalizedName: "Pakistan",
    },
    AdministrativeArea: {
      ID: "SD",
      LocalizedName: "Sindh",
    },
  },
  {
    Version: 1,
    Key: "102677",
    Type: "City",
    Rank: 15,
    LocalizedName: "Kaifeng",
    Country: {
      ID: "CN",
      LocalizedName: "China",
    },
    AdministrativeArea: {
      ID: "HA",
      LocalizedName: "Henan",
    },
  },
  {
    Version: 1,
    Key: "2580069",
    Type: "City",
    Rank: 15,
    LocalizedName: "Kashgar Prefecture",
    Country: {
      ID: "CN",
      LocalizedName: "China",
    },
    AdministrativeArea: {
      ID: "XJ",
      LocalizedName: "Xinjiang",
    },
  },
  {
    Version: 1,
    Key: "4361",
    Type: "City",
    Rank: 20,
    LocalizedName: "Kabul",
    Country: {
      ID: "AF",
      LocalizedName: "Afghanistan",
    },
    AdministrativeArea: {
      ID: "KAB",
      LocalizedName: "Kabul",
    },
  },
  {
    Version: 1,
    Key: "233776",
    Type: "City",
    Rank: 20,
    LocalizedName: "Kuala Lumpur",
    Country: {
      ID: "MY",
      LocalizedName: "Malaysia",
    },
    AdministrativeArea: {
      ID: "14",
      LocalizedName: "Kuala Lumpur",
    },
  },
  {
    Version: 1,
    Key: "308406",
    Type: "City",
    Rank: 20,
    LocalizedName: "Khartoum",
    Country: {
      ID: "SD",
      LocalizedName: "Sudan",
    },
    AdministrativeArea: {
      ID: "KH",
      LocalizedName: "Khartoum",
    },
  },
  {
    Version: 1,
    Key: "318416",
    Type: "City",
    Rank: 20,
    LocalizedName: "Kampala",
    Country: {
      ID: "UG",
      LocalizedName: "Uganda",
    },
    AdministrativeArea: {
      ID: "102",
      LocalizedName: "Kampala",
    },
  },
];

toast.configure();

function Home() {
  const searchInput = useRef();

  const [cityName, setCityName] = useState("");
  const [cityKey, setCityKey] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [userTyping, setUserTyping] = useState(false);

  const getCities = async () => {
    const { data } = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`
    );
    setFilteredList(data);
  };

  useEffect(() => {
    if (!cityName) {
      setCityKey(null);
      return setUserTyping(false);
    }
    const response = data.filter(search => {
      return search.LocalizedName.toLowerCase().includes(cityName);
    });
    setFilteredList(response);

    // getCities();
  }, [cityName]);

  const chooseCity = chosenCity => {
    searchInput.current.value = chosenCity.LocalizedName;
    searchInput.current.focus();
    setFilteredList([]);
    setCityName(chosenCity.LocalizedName);
    setCityKey(chosenCity.Key);
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
    setCityName(value);
  };

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
