import { useContext } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Row, Col, Statistic, Card } from "antd";
import { Avatar, List } from "antd";
import DashboardInformationCardList from "@components/Dashboard/DashboardInformationCardList";
import { TableContainer } from "@containers/Table";
import { DashboardTableColumn } from "@containers/TableColumn";
import StationModal from "@components/StationTable/StationModal";
import { SideNavContext } from "@pages/dashboard";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
];

const Dashboard = () => {
  const { setCurrentTabId } = useContext(SideNavContext);
  return (
    <div
      className="dashboard-container"
      style={{ height: "calc(100vh - 64px)", overflowY: "scroll" }}
    >
      <DashboardInformationCardList data={data} />
      <div
        className="flex justify-between items-end"
        style={{ marginBottom: 10, marginTop: 20 }}
      >
        <div className="font-bold" style={{ fontSize: 20 }}>
          Today Trip Table:
        </div>
        <div
          style={{ color: "#3586FF", cursor: "pointer" }}
          onClick={() => {
            setCurrentTabId("STATION_MANAGEMENT");
          }}
        >
          See more
        </div>
      </div>
      <TableContainer
        pathName="stations"
        columns={DashboardTableColumn}
        itemNumber={4}
      >
        <StationModal />
      </TableContainer>
      <div
        className="font-bold"
        style={{ fontSize: 20, marginBottom: 10, marginTop: 20 }}
      >
        Today Status:
      </div>
      <Row className="mt-4" gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <div className="font-bold" style={{ fontSize: 20, marginTop: 30 }}>
        Trip List
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
        style={{ backgroundColor: "white", marginTop: 20, borderRadius: 10 }}
      />
    </div>
  );
};

export default Dashboard;
