import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Trip } from "src/types/trip";

const TripModal = ({
  currentItem,
}: {
  currentItem?: Trip | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="trip-modal">
      <Form
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        disabled
      >
        <Form.Item name="id" label="ID">
          <Input defaultValue={currentItem?.id} disabled />
        </Form.Item>
        <Form.Item name="passengerName" label="Passenger Name">
          <Input defaultValue={currentItem?.passengerName} />
        </Form.Item>
        <Form.Item name="grabberName" label="Grabber Name">
          <Input defaultValue={currentItem?.grabberName} />
        </Form.Item>
        <Form.Item name="startTime" label="Start Time">
          <Input defaultValue={currentItem?.startTime} />
        </Form.Item>
        <Form.Item name="endTime" label="End Time">
          <Input defaultValue={currentItem?.endTime} />
        </Form.Item>
        <Form.Item name="feedbackPoint" label="Feedback Point">
          <Input defaultValue={currentItem?.feedbackPoint} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Input defaultValue={currentItem?.status} />
        </Form.Item>
        <Form.Item name="startStationName" label="Start Station Name">
          <Input defaultValue={currentItem?.startStationName} />
        </Form.Item>
        <Form.Item name="endStationName" label="endStationName">
          <Input defaultValue={currentItem?.endStationName} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TripModal;
