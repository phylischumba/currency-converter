import { Spinner } from "react-bootstrap";
import React from "react";
export default function LoadingSpinner() {
  return (
    <div className="spinner">
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
