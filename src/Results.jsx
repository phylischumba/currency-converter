import { Card, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingState";

export default function Results({ base, target }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let url = `https://api.coingecko.com/api/v3/simple/price?ids=${base}&vs_currencies=${target}`;
  const [amount, setAmount] = useState(0);
  const handleChange = (e) => {
    setAmount(e.target.valu);
  };
  const [errMsg, setErrMsg] = useState(false);

  const handleClick = () => {
    if (base === "") {
      setErrMsg(true);
      return;
    } else if(target === ""){
      setErrMsg(true);
    }else{
      setErrMsg(false)
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
    fetchData();
  };
  console.log(errMsg);

  if (error) {
    <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      {isLoading ? <LoadingSpinner /> : <></>}
      <Card>
        <Card.Header>
          <h3>Amount and results</h3>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <label>Amount</label>
          <input onChange={handleChange} type="number" />
          <Button
            className="w-50 color-white mx-auto my-3"
            variant="dark"
            onClick={handleClick}
          >
            Convert
          </Button>
          {data ? (
            <h4 className="font-weight-bold">
              {data[base][target]} {target}
            </h4>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
            {errMsg ? <Alert variant="danger">Base and target are require</Alert> : <></>}

    </>
  );
}
