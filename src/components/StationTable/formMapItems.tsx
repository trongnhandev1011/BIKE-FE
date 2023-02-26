interface IStationModalFormItems {
  name: string;
  label: string;
  disabled?: boolean;
}

export type StationFormFields =
  | "id"
  | "name"
  | "description"
  | "address"
  | "longitude"
  | "latitude"
  | "status";

export const stationModalFormItems: IStationModalFormItems[] = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "description",
    label: "Description",
  },
  {
    name: "address",
    label: "Address",
  },
];
