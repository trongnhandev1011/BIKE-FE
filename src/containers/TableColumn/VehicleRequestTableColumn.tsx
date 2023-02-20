import type { ColumnsType, ColumnType} from "antd/es/table";
import {Tag} from "antd";
import { Vehicle, VehicleRequestTableHeaderType } from "../../types/vehicle";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";

const vehicleRequestColumns: ColumnsType<VehicleRequestTableHeaderType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Brand Name",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "License Plate Number",
    dataIndex: "licencePlate",
    key: "licencePlate",
  },
  {
    title: "Vehicle Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    //dataIndex: "status",
    key: "status",
    render: (record) => (
        <Tag color={record.status==='WAITING' ? 'yellow' : record.status==='DENY' ? 'red' : 'green'}>
            {record.status}
        </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (<a onClick={record?.getDetail}>See detail</a>),
  },
];

export default vehicleRequestColumns;
