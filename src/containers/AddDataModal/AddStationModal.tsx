import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import React from "react";
import { PaginationResponse } from "src/types/Response.type";
import AddStationModal from "@components/StationTable/AddStationModal";
import useSWRInfinite from "swr/infinite";
import axiosClient from "@services/backend/axiosClient";

export const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);

const AddStationModalContainer = ({
  isOpen,
  setIsOpen,
  children,
  ...props
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: any;
}) => {
  const closeModalHandle = () => {
    setIsOpen(false);
  };

  const { data: response, setSize } = useSWRInfinite<PaginationResponse<any>>(
    (pageNumber) => `/stations?pageNumber=${pageNumber + 1}&pageSize=10`,
    fetcher
  );

  return (
    <div className="add-station-modal-container">
      <Modal
        destroyOnClose
        open={isOpen}
        onCancel={() => closeModalHandle()}
        footer={null}
      >
        <AddStationModal
          stations={
            response
              ? response?.reduce(
                  (currentValue, { data: { items } }) =>
                    [...currentValue, ...items] as any,
                  []
                )
              : []
          }
          setPageNumber={setSize}
        />
      </Modal>
    </div>
  );
};

export default AddStationModalContainer;
