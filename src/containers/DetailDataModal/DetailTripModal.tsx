import React from "react";
import { PaginationResponse, Response } from "src/types/Response.type";
import { Trip } from "src/types/trip";
import useSWR from "swr";
import TripModal from "@components/TripTable/TripModal";

const DetailTripModalContainer = ({
  currentItem,
}: {
  children?: any;
  currentItem?: Trip | null;
}) => {
  const { data: response } = useSWR<Response<Trip>>({
    url: `/trips/${currentItem?.id}`,
    args: {},
  });

  return (
    <div className="detail-trip-modal-container">
      <TripModal currentItem={response?.data} />
    </div>
  );
};

export default DetailTripModalContainer;
