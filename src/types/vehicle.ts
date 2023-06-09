import { User } from "./user";

export type Vehicle = {
  id: number;
  brand: string;
  licencePlate: string;
  image: string;
  description: string;
  type: "BIKE" | "MOTORBIKE" | "CAR";
  status: "WAITING" | "APPROVED" | "DENY";
  owner: User;
};

export type VehicleRequestTableHeaderType = Pick<
  Vehicle,
  "id" | "brand" | "licencePlate" | "type" | "status"
>;
