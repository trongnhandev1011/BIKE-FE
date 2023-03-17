import React, { useRef, useState } from "react";
import { StationTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import { Typography, Button, Input } from "antd";
import { AddStationModalContainer } from "@containers/AddDataModal";
import { DetailStationModalContainer } from "@containers/DetailDataModal";
import { ClearOutlined, PlusOutlined } from "@ant-design/icons";
import FilterDisplay from "./FilterDisplay";

const { Search } = Input;

const StationScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<object>({});
  const [searchText, setSearchText] = useState<string>("");
  const [forceRerender, setForceRerender] = useState<number>(0);

  const filterParamsDisplay = JSON.parse(JSON.stringify(searchParams));
  Object.entries(filterParamsDisplay).forEach(([key, value]) => {
    const newKey = StationTableColumn.filter(
      (column: any) => column.key === key
    )[0]?.title;

    if (newKey) {
      delete Object.assign(filterParamsDisplay, {
        [newKey as any]: filterParamsDisplay[key],
      })[key];
    }

    if (key === "sortBy") {
      filterParamsDisplay[key] = StationTableColumn.filter(
        (column: any) => column.key === value || column?.sortKey === value
      )[0]?.title;
    }
  });

  return (
    <div className="station-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title level={2}>Station Management</Typography.Title>
      <div className="flex justify-between">
        <div className="flex">
          <Search
            className="w-80 mr-3"
            placeholder="Input search text"
            enterButton
            onSearch={(value: string) =>
              setSearchParams((prev) => ({ ...prev, partialName: value }))
            }
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <FilterDisplay
            setForceRerender={setForceRerender}
            setSearchParams={setSearchParams}
            searchParams={filterParamsDisplay}
            clearText={() => setSearchText("")}
          />
        </div>

        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-btn-antd"
        >
          Add Station
        </Button>
      </div>
      <TableContainer
        pathName="stations"
        columns={StationTableColumn}
        pagination
        itemNumber={6}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        forceRerender={forceRerender}
      >
        <DetailStationModalContainer />
      </TableContainer>
      <AddStationModalContainer
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />
    </div>
  );
};

export default StationScreen;
