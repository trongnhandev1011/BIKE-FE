import axiosClient from "@services/backend/axiosClient";

import { Response } from "src/types/Response.type";
import { VehicleRequestApproval } from "./type";

export function updateVehicleRequestStatusAPI( id:number|undefined, requestBody: VehicleRequestApproval) {
  const url = `vehicles/${id}/status`;

  return axiosClient.put<Response<VehicleRequestApproval>>(
    url,
    {
      ...requestBody,
    }
  );
}