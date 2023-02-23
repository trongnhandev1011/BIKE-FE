import type { ColumnsType } from "antd/es/table";
import { StationTableHeaderType } from "../../types/station";

const stationColumns: ColumnsType<StationTableHeaderType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
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
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (record) => <a onClick={record?.getDetail}>See detail</a>,
  },
];

export default stationColumns;
