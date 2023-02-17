import React, { useState } from "react";
import { StationTableColumn } from "@containers/TableColumn";
import { TableContainer } from "@containers/Table";
import { Typography, Button } from "antd";
import { AddStationModalContainer } from "@containers/AddDataModal";
import DetailStationModalContainer from "@containers/DetailStationModal/DetailStationModal";

const StationScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="station-page" style={{ height: "calc(100vh - 64px)" }}>
      <Typography.Title className="ml-5" level={2}>
        Station Management
      </Typography.Title>
      <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
        Add Station
      </Button>
      <TableContainer
        pathName="stations"
        columns={StationTableColumn}
        inputSearch
        pagination
        itemNumber={10}
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
