import React, { Dispatch, SetStateAction } from "react";
import { Pagination } from "antd";

const PaginationComponent = ({
  total,
  setCurrentPage,
}: {
  total: number | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="table-pagination">
      <Pagination
        defaultCurrent={1}
        total={total}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default PaginationComponent;
