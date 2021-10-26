import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function CitiesList({ filteredList, chooseCity }) {
  return (
    <ListGroup>
      {filteredList.map((city, i) => {
        return (
          <ListGroup.Item
            key={i}
            className="cities-list"
            onClick={() => chooseCity(city)}
          >
            {city}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default CitiesList;
