import { Station } from "./station";
import { User } from "./user";

export type Trip = {
  id: number;
  passengerName: string;
  grabberName: string;
  startTime: string;
  endTime: string;
  feedbackPoint: number;
  status: "CREATED" | "CANCELED" | "ON_GOING" | "FINISHED";
  startStationName: string;
  endStationName: string;
  passengerId: string;
  grabberId: string;
  postedStartTime: string;
};

export type TripTableHeaderType = Pick<
  Trip,
  | "id"
  | "passengerName"
  | "grabberName"
  | "startStationName"
  | "endStationName"
  | "startTime"
  | "postedStartTime"
>;
