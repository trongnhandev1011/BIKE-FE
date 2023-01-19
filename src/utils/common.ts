import axiosClient from "@services/backend/axiosClient";

export const isServer = () => typeof window === "undefined";

export const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);
