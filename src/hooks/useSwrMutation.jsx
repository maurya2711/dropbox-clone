import axios from "axios";
import useSWRMutation from "swr/mutation";
import { useCookies } from "react-cookie";

export const otherFetcher = async (query, payload) => {
  const token = query?.token;
  const baseUrl = `${import.meta.env.VITE_BASEURL}${query.url}`;
  const headers = {
    // "Content-Type": "application/json",
    ...(token ? { "x-access-token": token } : {}),
  };
  const axiosInstance = axios.create({
    headers,
  });
  try {
    const response = await axiosInstance({
      url: baseUrl,
      method: query.method,
      data: payload.arg,
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

const useMutation = (url, method) => {
  const [cookies] = useCookies([]);
  let { trigger } = useSWRMutation(
    { url, method, token: cookies?.token },
    otherFetcher
  );

  return { trigger };
};

export default useMutation;
