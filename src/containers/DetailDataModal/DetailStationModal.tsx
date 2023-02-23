import { Dispatch, SetStateAction, useEffect, useState } from "react";
import React from "react";
import { PaginationResponse, Response } from "src/types/Response.type";
import StationModal from "@components/StationTable/StationModal";
import useSWRInfinite from "swr/infinite";
import axiosClient from "@services/backend/axiosClient";
import { Station } from "src/types/station";
import useSWR from "swr";

export const fetcherWithParams = (url: string) =>
  axiosClient.get(url).then((res) => res.data);

const DetailStationModalContainer = ({
  isEdit,
  setIsEdit,
  currentItem,
  refreshTable,
}: {
  children?: any;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  currentItem?: Station | null;
  refreshTable?: any;
}) => {
  const { data: allStationsResponse, setSize } = useSWRInfinite<
    PaginationResponse<any>
  >(
    (pageNumber) => `/stations?pageNumber=${pageNumber + 1}&pageSize=10`,
    fetcherWithParams
  );

  const { data: currentStationResponse, mutate: mutateModal } = useSWR<
    Response<Station>
  >({
    url: `/stations/${currentItem?.id}`,
    args: {},
  });

  return (
    <div className="detail-station-modal-container">
      <StationModal
        stations={
          allStationsResponse
            ? allStationsResponse?.reduce(
                (currentValue, { data: { items } }) =>
                  [...currentValue, ...items] as any,
                []
              )
            : []
        }
        setPageNumber={setSize}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentItem={currentStationResponse?.data}
        refreshModal={mutateModal}
        refreshTable={refreshTable}
      />
    </div>
  );
};

export default DetailStationModalContainer;
