import { Spinner } from "react-bootstrap";
import React from "react";
const LoadingSpinner = () => {

  return (
    <div className="spinner">
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
export default  LoadingSpinner
