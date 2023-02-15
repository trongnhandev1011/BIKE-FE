import axiosClient from "@services/backend/axiosClient";

export const isServer = () => typeof window === "undefined";

export const fetcher = (props: any) =>
  axiosClient.get(props.url, { params: props.args }).then((res) => res.data);
