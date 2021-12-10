import Currency from "./Currency";
import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import Results from "./Results";
import React, { useState } from "react";

function App() {
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");

  const handleSelectBase = (e) => {
    setSelectedBase(e.target.value);
  };
  const handleSelectTarget = (e) => {
    setSelectedTarget(e.target.value);
  };
  return (
    <Container className="App mt-5">
      <Row className="my-5">
        <h1 className="my-5">Curreny Converter</h1>
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
      <Row>
        <Col lg={6} className="m-auto">
          <Results base={selectedBase} target={selectedTarget} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
