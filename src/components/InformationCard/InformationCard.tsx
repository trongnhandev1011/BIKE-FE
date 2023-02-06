import { CarOutlined } from "@ant-design/icons";

const InformationCard = ({ data }: { data: any }) => {
  return (
    <div
      className="information-card-component flex justify-between"
      style={{ backgroundColor: "white", padding: 20, borderRadius: 15 }}
    >
      <div>
        <div style={{ color: "#8C8C8C", fontWeight: "bold" }}>Today's trip</div>
        <div className="flex">
          <div style={{ fontWeight: "bold", fontSize: 28 }}>10000 trip</div>
          <div className="ml-2" style={{ color: "green" }}>
            +30%
          </div>
        </div>
      </div>
      <div
        className="flex items-center px-4"
        style={{ backgroundColor: "#1A90FF", borderRadius: 10 }}
      >
        <CarOutlined
          style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
        />
      </div>
    </div>
  );
};

export default InformationCard;
