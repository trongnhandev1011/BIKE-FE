import { useState, MutableRefObject, Dispatch, SetStateAction } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Input, Row, Col } from "antd";
import { PaginationResponse } from "src/types/Response.type";
import { TableComponent } from "@components/Table";
import Pagination from "@components/Pagination/Pagination";
import { DetailDataModalContainer } from "@containers/DetailDataModal";

const { Search } = Input;

const TableContainer = ({
  pathName,
  columns,
  children,
  pagination,
  inputSearch,
  itemNumber,
  searchParams = {},
  forceRerender = 0,
  setSearchParams = (prev) => {},
}: {
  pathName: string;
  columns: any;
  children?: any;
  pagination?: boolean;
  inputSearch?: boolean;
  itemNumber?: number;
  searchParams?: object;
  forceRerender?: number;
  setSearchParams?: Dispatch<SetStateAction<object>>;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentId, setCurrentId] = useState<number>(0);

  const { data: response, mutate: mutateTable } = useSWR<
    PaginationResponse<any>
  >({
    url: `/${pathName}`,
    args: {
      pageNumber: currentPage.toString(),
      pageSize: "10",
      ...searchParams,
    },
  });

  const itemList = response?.data?.items.map((item: any) => ({
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
      {inputSearch ? (
        <Row>
          <Col span={18}></Col>
          <Col span={6}>
            <Search
              placeholder="input search text"
              enterButton
              onSearch={(value: string) =>
                setSearchParams((prev) => ({ ...prev, partialName: value }))
              }
            />
          </Col>
        </Row>
      ) : null}
      <TableComponent
        forceRerender={forceRerender}
        data={response?.data}
        columns={columns}
        itemNumber={itemNumber}
        onChange={(_: any, filters: any, sorter: any) => {
          for (const [key, value] of Object.entries(filters)) {
            if (value === undefined || value === null) continue;
            setSearchParams((prev) => ({
              ...prev,
              [key]: Array.isArray(value) ? value[0] : value,
            }));
          }

          if (sorter?.order) {
            setSearchParams((prev) => ({
              ...prev,
              sortBy: sorter?.column?.sortKey || sorter.columnKey,
              sortDirection: sorter.order === "ascend" ? "ASC" : "DESC",
            }));
          }

          mutateTable({
            url: `/${pathName}`,
            args: {
              pageNumber: currentPage.toString(),
              pageSize: "10",
              ...searchParams,
            },
          });
        }}
      />
      <DetailDataModalContainer
        currentId={currentId}
        itemList={itemList}
        setCurrentId={setCurrentId}
        refreshTable={mutateTable}
      >
        {children}
      </DetailDataModalContainer>
      {pagination ? (
        <Pagination
          total={response?.data?.totalSize}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </div>
  );
};

export default TableContainer;
