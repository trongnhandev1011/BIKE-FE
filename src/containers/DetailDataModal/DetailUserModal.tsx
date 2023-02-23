import React from "react";
import { Response } from "src/types/Response.type";
import useSWR from "swr";
import UserModal from "@components/UserTable/UserModal";
import { User } from "src/types/user";

const DetailUserModalContainer = ({
  currentItem,
  refreshTable,
}: {
  children?: any;
  currentItem?: User | null;
  refreshTable?: any;
}) => {
  const { data: response, mutate } = useSWR<Response<User>>({
    url: `/accounts/${currentItem?.id}`,
    args: {},
  });

  return (
    <div className="detail-user-modal-container">
      <UserModal
        currentItem={response?.data}
        closeModalHandle={() => {
          mutate();
          refreshTable();
        }}
      />
    </div>
  );
};

export default DetailUserModalContainer;
