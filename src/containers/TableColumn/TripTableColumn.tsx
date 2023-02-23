import type { ColumnsType, ColumnType } from "antd/es/table";
import { TripTableHeaderType } from "../../types/trip";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";

const tripColumns: ColumnsType<TripTableHeaderType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Start Station Name",
    dataIndex: "startStationName",
    key: "startStationName",
  },
  {
    title: "End Station Name",
    dataIndex: "endStationName",
    key: "endStationName",
  },
  {
    title: "Passenger Name",
    dataIndex: "passengerName",
    key: "passengerName",
  },
  {
    title: "Grabber Name",
    dataIndex: "grabberName",
    key: "grabberName",
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
    sortKey: "startAt",
    sorter: true,
  },
  {
    title: "Action",
    key: "action",
    render: (record) => <a onClick={record?.getDetail}>See detail</a>,
  },
];

export default tripColumns;
