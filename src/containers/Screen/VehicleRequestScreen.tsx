import React, { useState, useRef } from "react";
import type { ColumnType } from "antd/es/table";
import { VehicleRequestTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import VehicleModal from "@components/VehicleRequestTable/VehicleModal";
import { Typography, Button, Input, Space, Table } from "antd";
import { VehicleRequestTableHeaderType } from "../../types/vehicle";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { DetailVehicleModalContainer } from "@containers/DetailDataModal";
import FilterDisplay from "./FilterDisplay";

interface ISearchParams {
  brand?: string;
  licensePlate?: string;
}

type DataIndex = keyof VehicleRequestTableHeaderType;

const VehicleRequestScreen = () => {
  const [searchParams, setSearchParams] = useState<object>({});
  const [forceRerender, setForceRerender] = useState<number>(0);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    if (!!selectedKeys[0]) {
      setSearchParams({ ...searchParams, [dataIndex]: selectedKeys[0] });
    } else {
      setSearchParams((prev: any) => {
        let copy = JSON.parse(JSON.stringify(prev));
        delete copy[dataIndex as DataIndex];
        return copy;
      });
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<VehicleRequestTableHeaderType> => ({
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
    <div
      className="vehicle-request-page"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Typography.Title level={2}>Vehicle Request Management</Typography.Title>
      <FilterDisplay
        setForceRerender={setForceRerender}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      <TableContainer
        forceRerender={forceRerender}
        pathName="vehicles"
        columns={VehicleRequestTableColumn.map(
          (column: ColumnType<VehicleRequestTableHeaderType>, index) => ({
            ...column,
            ...(!!column.dataIndex &&
            ["brand", "licencePlate"].includes(column.dataIndex.toString())
              ? getColumnSearchProps(column.dataIndex as DataIndex)
              : {}),
          })
        )}
        pagination
        itemNumber={6}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      >
        <DetailVehicleModalContainer />
      </TableContainer>
    </div>
  );
};

export default VehicleRequestScreen;
