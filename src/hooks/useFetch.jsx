import axios from "axios";
import useSWR from "swr";
import { useCookies } from "react-cookie";

const useFetch = (url, method) => {
  const [cookies] = useCookies([]);
  const token = cookies?.token;

  const fetcher = async () => {
    const baseUrl = `${import.meta.env.VITE_BASEURL}${url}`;
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
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      return error.response;
    }
  };
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    suspense: true,
    revalidate: true,
    populateCache: true,
  });

  return { data, error, isLoading };
};

export default useFetch;
