import axios from "axios";
import { useState, useEffect } from "react";

const useApiRequest = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
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
    };
    fetchData();
  }, [url]);

  return { error, isLoading, data };
};

export default useApiRequest;
