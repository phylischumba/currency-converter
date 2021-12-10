import Currency from "./components/Currency";
import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import Results from "./components/Results";
import React, { useState } from "react";

const App = () => {
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");

  // set state for base currency
  const handleSelectBase = (e) => {
    setSelectedBase(e.target.value);
  };

  // set state for target currency
  const handleSelectTarget = (e) => {
    setSelectedTarget(e.target.value);
  };

  return (
    <Container className="App">
      <Row className="mt-5">
        <h1 className="mt-5">Curreny Converter</h1>
      </Row>
      <Row className="my-5">
        <Col md={6}>
          <Currency
            currencyName="Base Currency"
            onSelect={handleSelectBase}
            base
          ></Currency>
        </Col>
        <Col md={6}>
          <Currency
            currencyName="Target Currency"
            onSelect={handleSelectTarget}
          ></Currency>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={6} className="m-auto">
          <Results base={selectedBase} target={selectedTarget} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
