import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import client from "../api/api";
import { METHODS } from "../utils/constant";
import { isFunction } from "../utils/functions";

const UNMOUNTED_COMPONENT = "component unmount";

const useFetch = ({
  initialUrl = null,
  initialData = null,
  config = {},
  skipOnStart = false,
  onSuccess,
  onFailure,
  transform,
}) => {
  const [url, updateUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(!skipOnStart);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fetchIndex, setFetchIndex] = useState(skipOnStart ? 0 : 1);

  const transformResponse = useCallback(
    (response) => {
      try {
        const parsedResponse = JSON.parse(response);
        return transform?.(parsedResponse) ?? parsedResponse;
      } catch (error) {
        throw new Error("Error parsing response JSON data");
      }
    },
    [transform],
  );

  const [axiosConfig, updateConfig] = useState({
    ...config,
    ...(transform && { transformResponse }),
  });

  const callFetch = useCallback((newConfig) => {
    setHasError(false);
    setIsLoading(true);
    if (newConfig) {
      updateConfig((prevConfig) => ({
        ...prevConfig,
        ...newConfig,
      }));
    }

    setFetchIndex((prevFetchIndex) => prevFetchIndex + 1);
  }, []);

  const fetchData = useCallback(
    async (cancelToken) => {
      try {
        const URL = url;
        const { data: response, error } = await client({
          url: URL,
          cancelToken,
          method: METHODS.GET,
          ...axiosConfig,
        });
        if (!error) {
          setData(response);
          setHasError(false);
          setErrorMessage(null);
          setIsLoading(false);
          setFetchIndex(0);
          if (isFunction(onSuccess)) onSuccess(response);
        } else {
          const errorMsg = error?.message || "Something went wrong";
          // in case cancel token error - do not update react state to prevent memory leak
          if (errorMsg === UNMOUNTED_COMPONENT) return null;

          setHasError(true);
          setIsLoading(false);
          setFetchIndex(0);
          setErrorMessage(`error_${errorMsg}`);

          if (isFunction(onFailure)) onFailure(errorMsg);
        }
        return { response, error };
      } catch (error) {
        onFailure && setData([]);
        setIsLoading(false);
      }
    },
    [axiosConfig, onFailure, onSuccess, url],
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (fetchIndex > 0 && url) {
      fetchData(cancelTokenSource.token);
    }
    return () => {
      cancelTokenSource.cancel(UNMOUNTED_COMPONENT);
    };
  }, [fetchData, fetchIndex, url]);

  return {
    data,
    isLoading,
    hasError,
    errorMessage,
    callFetch,
    updateUrl,
    updateConfig,
  };
};
export default useFetch;
