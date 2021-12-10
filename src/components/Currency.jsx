import { Card, Col, Form, Alert } from "react-bootstrap";
import React from "react";
import useApiRequest from "../api/api";
import LoadingSpinner from "./LoadingState";

const  Currency = ({ currencyName, base, onSelect }) => {
// set up url for the two select components
  let url = base
    ? `${process.env.REACT_APP_COINS_API}/list?include_platform=false`
    : `${process.env.REACT_APP_SIMPLE_API}/supported_vs_currencies`;

  // fetching data
  const { data, isLoading, error } = useApiRequest(url);

  // if an error exist when fetching data
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
    {/* whenever an api call is loading, display a loading spinner */}
      {isLoading ? <LoadingSpinner /> : <></>}
      <Card>
        <Card.Header>
          <h1>{currencyName}</h1>
        </Card.Header>
        <Card.Body>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label className="text-start w-100" l>
              {currencyName}
            </Form.Label>
            <Form.Select onChange={onSelect}>
              <option>Select {currencyName}</option>
              {data &&
                data.map((opt) => (
                  <option value={base ? opt.id : opt} key={base ? opt.id : opt}>
                    {base ? opt.name : opt}
                  </option>
                ))}{" "}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
}

export default Currency;
