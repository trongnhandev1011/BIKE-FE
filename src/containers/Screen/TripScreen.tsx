import React, { useState, useRef } from "react";
import type { ColumnType } from "antd/es/table";
import { TripTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import TripModal from "@components/TripTable/TripModal";
import { Typography, Button, Input, Space, Table } from "antd";
import { TripTableHeaderType } from "../../types/trip";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface ISearchParams {
  id?: string;
  passengerName?: string;
  grabberName?: string;
  startStationName?: string;
  endStationName?: string;
  startTime?: string;
  endTime?: string;
}

type DataIndex = keyof TripTableHeaderType;

const TripScreen = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({});
  const searchInput = useRef<InputRef>(null);
  const [forceRerender, setForceRerender] = useState<number>(0);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    if (!!selectedKeys[0]) {
      setSearchParams({ ...searchParams, [dataIndex]: selectedKeys[0] });
    } else {
      setSearchParams((prev) => {
        let copy = prev;
        delete copy[dataIndex as DataIndex];
        return copy;
      });
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<TripTableHeaderType> => ({
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
    <div className="trip-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title className="ml-5" level={2}>
        Trip Management
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
        pathName="trips"
        columns={TripTableColumn.map(
          (column: ColumnType<TripTableHeaderType>, index) => ({
            ...column,
            ...(!!column.dataIndex &&
            !["id", "startTime"].includes(column.dataIndex.toString())
              ? getColumnSearchProps(column.dataIndex as DataIndex)
              : {}),
          })
        )}
        pagination
        itemNumber={10}
        searchParams={searchParams}
      >
        <TripModal />
      </TableContainer>
    </div>
  );
};

export default TripScreen;
