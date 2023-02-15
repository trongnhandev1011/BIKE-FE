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
};

export type TripTableHeaderType = Pick<
  Trip,
  | "id"
  | "passengerName"
  | "grabberName"
  | "startStationName"
  | "endStationName"
  | "startTime"
>;
