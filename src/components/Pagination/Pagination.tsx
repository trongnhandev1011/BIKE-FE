import React, { Dispatch, SetStateAction } from "react";
import { Pagination } from "antd";

const PaginationComponent = ({
  total,
  setCurrentPage,
  itemNumber,
}: {
  total: number | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemNumber?: number;
}) => {
  return (
    <div className="table-pagination">
      <Pagination
        pageSize={itemNumber || 10}
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
