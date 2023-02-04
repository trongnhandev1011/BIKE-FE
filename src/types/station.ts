export type Station = {
  id: number;
  name: string;
  description: string;
  address_string: string;
  longitude: number;
  latitude: number;
  created_time: string;
  create_by: string;
  last_modified_time: string;
  last_modified_by: string;
};

export type StationTableHeaderType = Pick<
  Station,
  "id" | "name" | "description" | "address_string"
>;
