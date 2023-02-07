import React from "react";
import { StationTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import StationModal from "@components/StationTable/StationModal";
import { Typography } from "antd";

const StationScreen = () => {
  return (
    <div className="station-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title className="ml-5" level={2}>
        Station Management
      </Typography.Title>
      <TableContainer
        pathName="stations"
        columns={StationTableColumn}
        inputSearch
        pagination
        itemNumber={10}
      >
        <StationModal />
      </TableContainer>
    </div>
  );
};

export default StationScreen;
