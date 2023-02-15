import {
  latitudeValidation,
  longitudeValidation,
} from "src/validation/createFormValidation";

export const formMapItems: {
  name: string;
  label: string;
  validation?: any;
  isRequired: boolean;
}[] = [
  {
    name: "name",
    label: "Name",
    isRequired: true,
  },
  {
    name: "description",
    label: "Description",
    isRequired: false,
  },
  {
    name: "address",
    label: "Address",
    isRequired: true,
  },
  {
    name: "longitude",
    label: "Longitude",
    validation: longitudeValidation,
    isRequired: true,
  },
  {
    name: "latitude",
    label: "Latitude",
    validation: latitudeValidation,
    isRequired: true,
  },
];
