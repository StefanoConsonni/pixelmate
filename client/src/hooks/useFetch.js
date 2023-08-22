import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);

  // Cache the function with useCallback
  const fetchData = useCallback(async () => {
    if (!abortController) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(url, { signal: abortController.signal });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();

      setData(data);
      setError(null);
    } catch (err) {
      if (err.name === "AbortError") {
        throw new Error(err);
      } else {
        setError("Could not fetch the data");
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  }, [abortController, url]);

  useEffect(() => {
    setAbortController(new AbortController());
  }, []);

  useEffect(() => {
    if (!abortController) {
      return;
    }

    fetchData();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController, fetchData]);

  return { data, isLoading, error };
};

export default useFetch;
