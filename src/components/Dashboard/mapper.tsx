export const dataMapper = ({
  numOfTrip = 0,
  numOfNewUser = 0,
  numOfWaitingVehicle = 0,
}: {
  numOfTrip?: number;
  numOfNewUser?: number;
  numOfWaitingVehicle?: number;
}) => [
  {
    type: "trip",
    number: numOfTrip,
  },
  {
    type: "new user",
    number: numOfNewUser,
  },
  {
    type: "vehicle",
    number: numOfWaitingVehicle,
  },
];
