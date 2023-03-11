import React from "react";
import { Response } from "src/types/Response.type";
import useSWR from "swr";
import UserModal from "@components/UserTable/UserModal";
import { User } from "src/types/user";

const DetailUserModalContainer = ({
  currentItem,
  refreshTable,
  ...rest
}: {
  currentItem?: User | null;
  refreshTable?: any;
  disableAdmin?: boolean;
}) => {
  const { data: response, mutate } = useSWR<Response<User>>({
    url: `/accounts/${currentItem?.id}`,
    args: {},
  });

  return (
    <div className="detail-user-modal-container">
      <UserModal
        currentItem={response?.data}
        mutateModal={() => {
          mutate();
          refreshTable();
        }}
        {...rest}
      />
    </div>
  );
};

export default DetailUserModalContainer;
