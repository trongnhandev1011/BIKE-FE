import React from "react";
import { Table } from "antd";

const TableComponent = ({
  data,
  columns,
  itemNumber,
}: {
  data: any;
  columns: any;
  itemNumber?: number;
}) => {
  return (
    <div className="station-table">
      <Table
        className="mt-5 mb-5"
        columns={columns}
        pagination={false}
        dataSource={data?.items.slice(0, itemNumber)}
      />
    </div>
  );
};

export default TableComponent;
