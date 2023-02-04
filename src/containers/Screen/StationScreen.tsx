import React from "react";
import { StationTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import StationModal from "@components/StationTable/StationModal";

const StationScreen = () => {
  return (
    <div className="station-page">
      <TableContainer
        pathName="stations"
        tableName="Station"
        columns={StationTableColumn}
      >
        <StationModal />
      </TableContainer>
    </div>
  );
};

export default StationScreen;
