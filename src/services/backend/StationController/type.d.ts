export type CreateStationRequest = {
  address: string;
  name: string;
  nextStationIds: number[];
  description: string;
  longitude: number;
  latitude: number;
};

export type CreateStationResponse = {
  id: number;
  name: string;
  address: string;
  description: string;
  longitude: number;
  latitude: number;
  status: string;
  nextStationIds: number[];
};
