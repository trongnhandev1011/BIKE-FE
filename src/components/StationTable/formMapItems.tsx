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
  | "latitude";

export const addStationFormItems: IStationModalFormItems[] = [
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
  {
    name: "longitude",
    label: "Longitude",
  },
  {
    name: "latitude",
    label: "Latitude",
  },
];

export const stationModalFormItems: IStationModalFormItems[] = [
  ...addStationFormItems,
  {
    name: "id",
    label: "ID",
    disabled: true,
  },
];
