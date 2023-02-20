import axiosClient from "@services/backend/axiosClient";

import { Response } from "src/types/Response.type";
import { UpdateAccountStatusRequest } from "./type";

export function updateAccountStatusAPI( id:string|undefined, status: string) {
  const url = `accounts/${id}?status=${status}`;

  return axiosClient.put<Response<UpdateAccountStatusRequest>>(
    url
  );
}