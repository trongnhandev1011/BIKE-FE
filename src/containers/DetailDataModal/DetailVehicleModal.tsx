import React from "react";
import { Response } from "src/types/Response.type";
import useSWR from "swr";
import { Vehicle } from "src/types/vehicle";
import VehicleModal from "@components/VehicleRequestTable/VehicleModal";

const DetailVehicleModalContainer = ({
  currentItem,
  refreshTable,
}: {
  children?: any;
  currentItem?: Vehicle | null;
  refreshTable?: any;
}) => {
  const { data: response, mutate } = useSWR<Response<Vehicle>>({
    url: `/vehicles/${currentItem?.id}`,
    args: {},
  });

  return (
    <div className="detail-user-modal-container">
      <VehicleModal
        currentItem={response?.data}
        closeModalHandle={() => {
          mutate();
          refreshTable();
        }}
      />
    </div>
  );
};

export default DetailVehicleModalContainer;
