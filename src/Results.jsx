import { Card, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingState";

export default function Results({ base, target }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(process.env.REACT_APP_SIMPLE_API);
  let url = `${process.env.REACT_APP_SIMPLE_API}/price?ids=${base}&vs_currencies=${target}`;
  const [amount, setAmount] = useState(0);
  const handleChange = (e) => {
    setAmount(e.target.valu);
  };
  const [errMsg, setErrMsg] = useState(false);

  const handleClick = () => {
    if (base === "") {
      setErrMsg(true);
      return;
    } else if (target === "") {
      setErrMsg(true);
    } else {
      setErrMsg(false);
    }
    const fetchData = () => {
      axios
        .get(url, { amount: amount }, setIsLoading(true))
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            setData(response?.data);
          }
        })
        .catch((error) => {
          setError(error);
        });
    };
    if (base !== "" && target !== "") {
      fetchData();
    }
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : <></>}
      {error ? <Alert variant="danger">{error?.message}</Alert> : <></>}
      <Card>
        <Card.Header>
          <h3>Amount and results</h3>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <label className="text-align-start">Amount</label>
          <input onChange={handleChange} className="p-2" type="number" />
          <Button
            className="color-white mx-auto my-3"
            variant="dark"
            onClick={handleClick}
          >
            Convert
          </Button>
          {data ? (
            <h4 className="font-weight-bold">
              {data[base][target]} {data && target}
            </h4>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
      {errMsg ? (
        <Alert
          variant="danger"
          className="position-absolute bottom-0 start-50 translate-middle"
        >
          Please ensure you select base and target currencies in order to
          convert
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}
