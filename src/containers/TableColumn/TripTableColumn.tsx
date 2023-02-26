import type { ColumnsType, ColumnType } from "antd/es/table";
import { TripTableHeaderType } from "../../types/trip";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { stringToGMT, stringToReadableGMT } from "@utils/datetime";

const tripColumns: any = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
    align: "right",
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
    key: "startTime",
    sortKey: "startAt",
    sorter: true,
    render: (record: any) => {
      return (
        record?.startTime && <div>{stringToReadableGMT(record?.startTime)}</div>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (record: any) => (
      <a onClick={record?.getDetail} className=" font-semibold text-blue-500">
        See detail
      </a>
    ),
  },
];

export default tripColumns;
