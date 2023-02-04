import type { ColumnsType } from "antd/es/table";
import { StationTableHeaderType } from "../../types/station";

const stationColumns: ColumnsType<StationTableHeaderType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Address",
    dataIndex: "address_string",
    key: "address_string",
  },
  {
    title: "Action",
    key: "action",
    render: (record) => <a onClick={record?.getDetail}>See detail</a>,
  },
];

export default stationColumns;
