import type { ColumnsType } from "antd/es/table";
import { StationTableHeaderType } from "../../types/station";
import { Tag } from "antd";

const stationColumns: ColumnsType<StationTableHeaderType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "8%",
    sorter: true,
    align: "right",
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
    title: "Status",
    key: "status",
    width: "10%",

    render: (record) => (
      <Tag color={record.status === "ACTIVE" ? "green" : "red"}>
        {record.status}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: "10%",
    render: (record) => (
      <a onClick={record?.getDetail} className=" font-semibold text-blue-500">
        See detail
      </a>
    ),
  },
];

export default stationColumns;
