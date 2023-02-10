import axios from "axios";
import useSWR from "swr";
import { useCookies } from "react-cookie";

const useFetch = (url, params = null, method = "GET") => {
  const [cookies] = useCookies([]);
  const token = cookies?.token;

  const fetcher = async (args) => {
    const baseUrl = `${import.meta.env.VITE_BASEURL}${args}`;
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { "x-access-token": token } : {}),
    };
    const axiosInstance = axios.create({
      headers,
    });
    try {
      const response = await axiosInstance({
        url: baseUrl,
        method: method,
        data: null,
      });
      return {
        data: response?.data?.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      return error.response;
    }
  };
  let response;
  if (params) {
    response = useSWR(`${url}${params}`, fetcher, {
      revalidateOnFocus: false,
      suspense: true,
      revalidate: params ? true : false,
      populateCache: true,
    });
  } else {
    response = useSWR("", fetcher, {
      revalidateOnFocus: false,
      suspense: true,
      revalidate: params ? true : false,
      populateCache: true,
    });
  }
  const { data, error, isLoading } = response;

  return { data, error, isLoading };
};

export default useFetch;
