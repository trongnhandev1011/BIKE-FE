import React from "react";
import { Table } from "antd";

const TableComponent = ({
  data,
  columns,
  itemNumber,
  forceRerender = 0,
  onChange,
}: {
  data: any;
  columns: any;
  itemNumber?: number;
  forceRerender?: number;
  onChange?: any;
}) => {
  return (
    <div className="station-table">
      <Table
        onChange={onChange}
        className="mt-5 mb-5"
        columns={columns}
        pagination={false}
        dataSource={[...(data?.items || [])]}
        key={forceRerender}
      />
    </div>
  );
};

export default TableComponent;
