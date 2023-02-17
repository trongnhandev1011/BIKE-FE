export type Station = {
  id: number;
  name: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  created_time: string;
  create_by: string;
  last_modified_time: string;
  last_modified_by: string;
  nextStations: Station[];
};

export type StationTableHeaderType = Pick<
  Station,
  "id" | "name" | "description" | "address"
>;
