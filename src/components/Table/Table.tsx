import React, { Dispatch, SetStateAction } from "react";
import { Table } from "antd";

const TableComponent = ({ data, columns }: { data: any; columns: any }) => {
  return (
    <div className="station-table ml-5">
      <Table
        className="mt-5 mb-5"
        columns={columns}
        pagination={false}
        dataSource={data?.items}
      />
    </div>
  );
};

export default TableComponent;
