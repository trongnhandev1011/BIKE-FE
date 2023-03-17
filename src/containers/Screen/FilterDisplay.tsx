import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  FilterOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Dispatch, SetStateAction } from "react";

interface IFilterDisplayProps {
  setForceRerender: Dispatch<SetStateAction<number>>;
  setSearchParams: Dispatch<SetStateAction<object>>;
  searchParams: any;
  clearText?: any;
}

const FilterDisplay = ({
  setForceRerender,
  setSearchParams,
  searchParams,
  clearText,
}: IFilterDisplayProps) => {
  if (searchParams?.partialName) {
    searchParams["Name"] = searchParams.partialName;
    delete searchParams.partialName;
  }

  return (
    <div className="filter-display flex gap-3">
      <Button
        className="rounded-btn-antd"
        onClick={() => {
          setForceRerender((forceRerender) => forceRerender + 1);
          setSearchParams({});
          if (clearText) clearText();
        }}
        icon={<ClearOutlined />}
      >
        Clear all filters
      </Button>
      {Object.entries(searchParams)?.map(
        ([key, value]: [key: string, value: any]) => {
          if (key === "sortDirection") return null;
          return key === "sortBy" ? (
            <Button
              key={key}
              className="rounded-btn-antd"
              icon={
                searchParams["sortDirection"] === "ASC" ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              }
            >
              {value}
            </Button>
          ) : (
            <Button
              key={key}
              className="rounded-btn-antd"
              icon={<FilterOutlined />}
            >
              {`${key}: ${value}`}
            </Button>
          );
        }
      )}
    </div>
  );
};

export default FilterDisplay;
