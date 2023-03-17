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
import { DetailTripModalContainer } from "@containers/DetailDataModal";
import FilterDisplay from "./FilterDisplay";

interface ISearchParams {
  passengerName?: string;
  grabberName?: string;
  startStationName?: string;
  endStationName?: string;
  sortDirection?: string;
  sortBy?: string;
}

type DataIndex = keyof ISearchParams;

const TripScreen = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({});
  const searchInput = useRef<InputRef>(null);
  const [forceRerender, setForceRerender] = useState<number>(0);

  const filterParamsDisplay = JSON.parse(JSON.stringify(searchParams));
  Object.entries(filterParamsDisplay).forEach(([key, value]) => {
    const newKey = TripTableColumn.filter(
      (column: any) => column.key === key
    )[0]?.title;

    if (newKey) {
      delete Object.assign(filterParamsDisplay, {
        [newKey]: filterParamsDisplay[key],
      })[key];
    }

    if (key === "sortBy") {
      filterParamsDisplay[key] = TripTableColumn.filter(
        (column: any) => column.key === value || column?.sortKey === value
      )[0]?.title;
    }
  });

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
        let copy = JSON.parse(JSON.stringify(prev));
        delete copy[dataIndex as DataIndex];
        return copy;
      });
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<TripTableHeaderType> => ({
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
    <div className="trip-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title level={2}>Trip Management</Typography.Title>
      <FilterDisplay
        setForceRerender={setForceRerender}
        setSearchParams={setSearchParams}
        searchParams={filterParamsDisplay}
      />
      <TableContainer
        forceRerender={forceRerender}
        pathName="trips"
        columns={TripTableColumn?.map(
          (column: ColumnType<TripTableHeaderType>) => ({
            ...column,
            ...(!!column.dataIndex &&
            !["id", "startTime", "postedStartTime"].includes(
              column.dataIndex.toString()
            )
              ? getColumnSearchProps(column.dataIndex as DataIndex)
              : {}),
          })
        )}
        pagination
        itemNumber={6}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      >
        <DetailTripModalContainer />
      </TableContainer>
    </div>
  );
};

export default TripScreen;
