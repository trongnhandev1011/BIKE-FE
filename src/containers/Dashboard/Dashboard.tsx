import { useContext, useEffect, useState, useRef } from "react";
import { Row, Col, Statistic, Card, DatePicker, Button } from "antd";
import DashboardInformationCardList from "@components/Dashboard/DashboardInformationCardList";
import { TableContainer } from "@containers/Table";
import {
  DashboardTableColumn,
  UserDashboardColumn,
  UserTableColumn,
} from "@containers/TableColumn";
import { SideNavContext } from "@pages/dashboard";
import dayjs from "dayjs";
import { TableComponent } from "@components/Table";
import { dateToISOFormatString, getRelativeDate } from "@utils/datetime";
import { RangeValue } from "rc-picker/lib/interface";
import { FileSearchOutlined } from "@ant-design/icons";
import { Bar } from "react-chartjs-2";
import useSWRMutation from "swr";

import { registerables, Chart } from "chart.js";
import { Response } from "src/types/Response.type";
import axiosClient from "@services/backend/axiosClient";

Chart.register(...registerables);

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const { setCurrentTabId } = useContext(SideNavContext);
  const dateRangeRef = useRef<RangeValue<dayjs.Dayjs> | null>([
    dayjs(getRelativeDate({ monthDiff: -2 })),
    dayjs(getRelativeDate({ monthDiff: 9 })),
  ]);

  const { data: response, mutate } = useSWRMutation<Response<any>>({
    url: "http://52.74.214.224:8080/api/v1/statistics",
    args: dateRangeRef.current
      ? {
          startFrom: dateToISOFormatString(dateRangeRef.current[0]!.toDate()),
          startTo: dateToISOFormatString(dateRangeRef.current[1]!.toDate()),
        }
      : {},
  });

  return (
    <div
      className="dashboard-container"
      style={{ height: "calc(100vh - 64px)", overflowY: "scroll" }}
    >
      <DashboardInformationCardList data={response?.data} />
      <div className="flex gap-5">
        <RangePicker
          defaultValue={dateRangeRef.current}
          format="DD/MM/YYYY"
          onChange={(dates) => (dateRangeRef.current = dates)}
        />
        <Button
          icon={<FileSearchOutlined />}
          type="primary"
          onClick={() =>
            mutate({
              url: "http://52.74.214.224:8080/api/v1/statistics",
              args: dateRangeRef.current
                ? {
                    startFrom: dateToISOFormatString(
                      dateRangeRef.current[0]!.toDate()
                    ),
                    startTo: dateToISOFormatString(
                      dateRangeRef.current[1]!.toDate()
                    ),
                  }
                : {},
            } as any)
          }
        >
          Get data
        </Button>
      </div>
      {response?.data?.dailyPost && (
        <div style={{ width: "90%", height: "25rem", margin: "0 auto" }}>
          <Bar
            data={{
              labels: Object.keys(response?.data?.dailyPost),
              datasets: [
                {
                  label: "Number of daily posts",
                  data: Object.values(response?.data?.dailyPost),
                  maxBarThickness: 100,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
      )}
      <div
        className="flex justify-between items-end"
        style={{ marginBottom: 10, marginTop: 20 }}
      >
        <div className="font-bold" style={{ fontSize: 20 }}>
          Top 5 users:
        </div>
        <div
          style={{ color: "#3586FF", cursor: "pointer" }}
          onClick={() => {
            setCurrentTabId("USER_MANAGEMENT");
          }}
        >
          See more
        </div>
      </div>
      <TableComponent
        data={{ items: response?.data?.top5Users }}
        columns={UserDashboardColumn}
      />
    </div>
  );
};

export default Dashboard;
