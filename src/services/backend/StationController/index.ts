import axiosClient from "@services/backend/axiosClient";
import { Response } from "src/types/Response.type";
import { CreateStationRequest, CreateStationResponse } from "./type";

export function createStationAPI(requestBody: CreateStationRequest) {
  return axiosClient.post<Response<CreateStationResponse>>("/stations", {
    ...requestBody,
  });
}
