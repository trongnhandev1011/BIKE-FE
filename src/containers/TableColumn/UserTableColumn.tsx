import type { ColumnsType, ColumnType } from "antd/es/table";
import { UserTableHeaderType } from "../../types/user";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tag, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";

const userColumns: ColumnsType<UserTableHeaderType> = [
//   {
//     title: "ID",
//     dataIndex: "id",
//     key: "id",
//   },
  {
    title: "Avatar",
    key: "avatar",
    render: (record) => (
      <Avatar src={record.avatar}/>
    ),
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
  },
  {
    title: "Status",
    //dataIndex: "status",
    key: "status",
    render: (record) => (
        <Tag color={record.status==='ACTIVE' ? 'green' :'red'}>
            {record.status}
        </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (record) => <a onClick={record?.getDetail}>See detail</a>,
  },
];

export default userColumns;
