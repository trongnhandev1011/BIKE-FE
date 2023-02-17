import { Dispatch, SetStateAction, useEffect, useState } from "react";
import React from "react";
import { PaginationResponse, Response } from "src/types/Response.type";
import StationModal from "@components/StationTable/StationModal";
import useSWRInfinite from "swr/infinite";
import axiosClient from "@services/backend/axiosClient";
import { Station } from "src/types/station";
import useSWR from "swr";

export const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);

const DetailStationModalContainer = ({
  isEdit,
  setIsEdit,
  currentItem,
}: {
  children?: any;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  currentItem?: Station | null;
}) => {
  const { data: allStationsResponse, setSize } = useSWRInfinite<
    PaginationResponse<any>
  >(
    (pageNumber) => `/stations?pageNumber=${pageNumber + 1}&pageSize=10`,
    fetcher
  );

  const { data: currentStationResponse } = useSWR<Response<Station>>({
    url: `/stations/${currentItem?.id}`,
    args: {},
  });

  return (
    <div className="detail-station-modal-container">
      <StationModal
        stations={
          allStationsResponse?.reduce(
            (currentValue, { data: { items } }) =>
              [...currentValue, ...items] as any,
            []
          ) || []
        }
        nextStations={currentStationResponse?.data.nextStations}
        setPageNumber={setSize}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentItem={currentItem}
      />
    </div>
  );
};

export default DetailStationModalContainer;
