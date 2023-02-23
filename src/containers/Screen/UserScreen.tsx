import React, { useState, useRef } from "react";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { UserTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import UserModal from "@components/UserTable/UserModal";
import { Typography, Button, Input, Space, Table } from "antd";
import { UserTableHeaderType } from "../../types/user";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { DetailUserModalContainer } from "@containers/DetailDataModal";

interface ISearchParams {
  partialName?: string;
  email?: string;
  phone?: string;
}

const nameToSearchParam = {
  name: "partialName",
  email: "email",
  phone: "phone",
};

type DataIndex = "name" | "email" | "phone";

const UserScreen = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({});
  const [forceRerender, setForceRerender] = useState<number>(0);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    if (!!selectedKeys[0]) {
      setSearchParams({
        ...searchParams,
        [nameToSearchParam[dataIndex]]: selectedKeys[0],
      });
    } else {
      setSearchParams((prev: any) => {
        let copy = prev;
        delete copy[dataIndex as DataIndex];
        return copy;
      });
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<UserTableHeaderType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  return (
    <div className="user-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title className="ml-5" level={2}>
        User Management
      </Typography.Title>
      <Button
        onClick={() => {
          setForceRerender((forceRerender) => forceRerender + 1);
          setSearchParams({});
        }}
      >
        Reset
      </Button>
      <TableContainer
        forceRerender={forceRerender}
        pathName="accounts"
        columns={UserTableColumn.map(
          (column: ColumnType<UserTableHeaderType>, index) => ({
            ...column,
            ...(!!column.dataIndex &&
            ["email", "name", "phone"].includes(column.dataIndex.toString())
              ? getColumnSearchProps(column.dataIndex as DataIndex)
              : {}),
          })
        )}
        pagination
        itemNumber={10}
        searchParams={searchParams}
      >
        <DetailUserModalContainer />
      </TableContainer>
    </div>
  );
};

export default UserScreen;
