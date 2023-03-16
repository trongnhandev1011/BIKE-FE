import { NotificationOutlined } from "@ant-design/icons";
import InformationCard from "@components/InformationCard/InformationCard";
import { NotificationBoxContainer } from "@containers/NotificationBox";
import { Col, Row } from "antd";
import { dataMapper } from "./mapper";

interface IPropsDashboardInformationCardList {
  numOfTrip?: number;
  numOfNewUser?: number;
  numOfWaitingVehicle?: number;
}

//will implement in the future
const DashboardInformationCardList = ({
  data,
}: {
  data?: IPropsDashboardInformationCardList;
}) => {
  return (
    <div className="dashboard-information-card-list">
      <Row justify="space-between" className="mb-6 pr-8 items-center">
        {data &&
          dataMapper(data).map((data) => (
            <Col span={7} key={data.type}>
              <InformationCard {...data} />
            </Col>
          ))}

        <NotificationBoxContainer />
      </Row>
    </div>
  );
};

export default DashboardInformationCardList;
