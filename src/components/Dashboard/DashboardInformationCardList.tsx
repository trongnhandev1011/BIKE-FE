import InformationCard from "@components/InformationCard/InformationCard";
import { Col, Row } from "antd";

//will implement in the future
const DashboardInformationCardList = ({ data }: { data: any }) => {
  return (
    <div className="dashboard-information-card-list">
      <Row justify="space-between" className="mb-6">
        <Col span={7}>
          <InformationCard data={data} />
        </Col>
        <Col span={7}>
          <InformationCard data={data} />
        </Col>
        <Col span={7}>
          <InformationCard data={data} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardInformationCardList;
