import axiosClient from "@services/backend/axiosClient";
import { Response } from "src/types/Response.type";
import {
  CreateStationRequest,
  CreateStationResponse,
  EditStationRequest,
  EditStationResponse,
} from "./type";

export function createStationAPI(requestBody: CreateStationRequest) {
  return axiosClient.post<Response<CreateStationResponse>>("/stations", {
    ...requestBody,
  });
}

export function editStationAPI(
  stationId: number,
  requestBody: EditStationRequest
) {
  return axiosClient.put<Response<EditStationResponse>>(
    `/stations/${stationId}`,
    {
      ...requestBody,
    }
  );
}

export function setStationStatusAPI(
  stationId: number,
  status: "ACTIVE" | "INACTIVE"
) {
  return axiosClient.put<Response<{ success: boolean }>>(
    `/stations/${stationId}/status?status=${status}`
  );
}
