import { useEffect, useState } from "react";
import useSWR from "swr";
import { Modal, Input, Typography, Row, Col } from "antd";
import { PaginationResponse } from "src/types/Response.type";
import { TableComponent } from "@components/Table";
import Pagination from "@components/Pagination/Pagination";
import { DetailDataModalContainer } from "@containers/DetailDataModal";

const { Search } = Input;

const TableContainer = ({
  pathName,
  tableName,
  columns,
  children,
}: {
  pathName: string;
  tableName: string;
  columns: any;
  children?: any;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentId, setCurrentId] = useState<number>(0);

  const { data: response } = useSWR<PaginationResponse<any>>(
    `/${pathName}?_page=${currentPage}&_limit=10`
  );

  const itemList = response?.data.items.map((item: any) => ({
    ...item,
    getDetail: () => {
      setCurrentId(item.id);
    },
  }));

  if (response?.data?.items) {
    response.data.items = itemList as any[];
  }

  return (
    <div className="table-container">
      <Typography.Title className="ml-5" level={2}>
        {tableName} Management
      </Typography.Title>
      <Row>
        <Col span={18}></Col>
        <Col span={6}>
          <Search placeholder="input search text" enterButton />
        </Col>
      </Row>
      <TableComponent data={response?.data} columns={columns} />
      <DetailDataModalContainer
        currentId={currentId}
        itemList={itemList}
        setCurrentId={setCurrentId}
      >
        {children}
      </DetailDataModalContainer>
      <Pagination
        total={response?.data?.totalSize}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TableContainer;
