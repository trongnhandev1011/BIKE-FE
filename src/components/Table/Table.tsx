import React from "react";
import { Table } from "antd";

const TableComponent = ({
  data,
  columns,
  itemNumber,
  forceRerender = 0,
  onChange,
  loading,
}: {
  data: any;
  columns: any;
  itemNumber?: number;
  forceRerender?: number;
  onChange?: any;
  loading?: boolean;
}) => {
  return (
    <div className="station-table">
      <Table
        loading={loading}
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
