import axiosClient from "../axiosClient";

export function loginAPI(props: { email: string; password: string }) {
  const { email, password } = props;
  return axiosClient.post("/login", { email, password });
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get("/me");
}
