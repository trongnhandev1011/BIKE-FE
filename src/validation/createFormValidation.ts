export const longitudeValidation = async (_: any, long: number) => {
  if (long && Math.abs(long) >= 180) {
    throw "False longtitude";
  }
};

export const latitudeValidation = async (_: any, lat: number) => {
  if (lat && Math.abs(lat) >= 90) {
    throw "False latitude";
  }
};

//because antd form can't validate number itself
export const idValidation = async (_: any, id: number) => true;
