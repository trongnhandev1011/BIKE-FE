import type { ColumnsType, ColumnType } from "antd/es/table";
import { UserTableHeaderType } from "../../types/user";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tag, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";

const userColumns: ColumnsType<UserTableHeaderType> = [
  {
    title: "Avatar",
    key: "avatar",
    render: (record) => <Avatar src={record.avatar} />,
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "User's Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    align: "right",
  },
  {
    title: "Status",
    key: "status",
    render: (record) => (
      <Tag color={record.status === "ACTIVE" ? "green" : "red"}>
        {record.status}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <a onClick={record?.getDetail} className=" font-semibold text-blue-500">
        See detail
      </a>
    ),
  },
];

export default userColumns;
