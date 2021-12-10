import { Card, Button, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingState";
import axios from "axios";

const Results = ({ base, target }) => {
  let url = `${process.env.REACT_APP_SIMPLE_API}/price?ids=${base}&vs_currencies=${target}`;
  const [amount, setAmount] = useState(1);
  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const [converted, setConverted] = useState();
  const [errMsg, setErrMsg] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [labelT, setLabel] = useState('')

  useEffect(() => {
    if (base && target) {
      axios
        .get(url, setIsLoading(true))
        .then((response) => {
          setIsLoading(false);
          setData(response.data);
        })
        .catch((error) => {
          setIsLoading(false);

          setError(error);
        });
    }
  }, [base, target, url]);

  const handleClick = () => {
    if (base === "" || target === "") {
      setErrMsg(true);
      return;
    } else {
      setErrMsg(false);
    }
    if (data !== undefined) {
      setLabel(Object.keys(data[base])[0]);

      return setConverted(data[base][target] * amount);
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
          <input
            onChange={handleChange}
            className="p-2"
            defaultValue={amount}
            type="number"
          />
          <Button
            className="color-white mx-auto my-3"
            variant="dark"
            onClick={handleClick}
          >
            Convert
          </Button>
          {converted !== undefined ? (
            <h4 className="font-weight-bold">
              {converted}{' '}{labelT}
            </h4>
          ) : null}
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
};

export default Results;
