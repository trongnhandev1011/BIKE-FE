import React, { useState, useRef } from "react";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { VehicleRequestTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import VehicleModal from "@components/VehicleRequestTable/VehicleModal";
import { Typography, Button, Input, Space, Table } from "antd";
import { VehicleRequestTableHeaderType } from "../../types/vehicle";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

const VehicleRequestScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [columnData, setColumnData] = useState([]);
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof VehicleRequestTableHeaderType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<VehicleRequestTableHeaderType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  return (
    <div className="vehicle-request-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title className="ml-5" level={2}>
        Vehicle Request Management
      </Typography.Title>
      <TableContainer
        pathName="vehicles"
        columns={VehicleRequestTableColumn.map(
          (column: ColumnType<VehicleRequestTableHeaderType>, index) => ({
            ...column,
            ...(column?.dataIndex
              ? getColumnSearchProps(column.dataIndex as DataIndex)
              : {}),
          })
        )}
        pagination
        itemNumber={10}
      >
        <VehicleModal />
      </TableContainer>
    </div>
  );
};

export default VehicleRequestScreen;
