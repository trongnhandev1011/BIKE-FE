import {
  MAX_NUMBER_VALIDATOR,
  MIN_NUMBER_VALIDATOR,
  REQUIRED_VALIDATOR,
  CUSTOM_VALIDATOR,
} from "./generalValidation";

//because antd form can't validate number itself
const idValidation = async (_: any, id: number) => true;

const StationFormValidation = {
  id: [REQUIRED_VALIDATOR("id"), CUSTOM_VALIDATOR(idValidation)],
  name: [REQUIRED_VALIDATOR("name")],
  description: [REQUIRED_VALIDATOR("description")],
  address: [REQUIRED_VALIDATOR("address")],
  longitude: [
    REQUIRED_VALIDATOR("longitude"),
    MAX_NUMBER_VALIDATOR("longitude", 180),
    MIN_NUMBER_VALIDATOR("longitude", -180),
  ],
  latitude: [
    REQUIRED_VALIDATOR("latitude"),
    MAX_NUMBER_VALIDATOR("latitude", 90),
    MIN_NUMBER_VALIDATOR("latitude", -90),
  ],
};

export default StationFormValidation;
