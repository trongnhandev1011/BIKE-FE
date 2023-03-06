import React from "react";
import {
  DetailDataModalContainer,
  DetailUserModalContainer,
} from "@containers/DetailDataModal";
import { stringToGMT } from "@utils/datetime";
import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Trip } from "src/types/trip";
import UserModal from "@components/UserTable/UserModal";

const TripModal = ({ currentItem }: { currentItem?: Trip | null }) => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState<number | string>(0);
  const userIdRef = useRef<{
    passengerId: string;
    grabberId: string;
  }>({ passengerId: "", grabberId: "" });

  if (currentItem) {
    const { startTime, endTime, passengerId, grabberId, ...rest } = currentItem;
    userIdRef.current = { passengerId, grabberId };

    form.setFieldsValue({
      startTime: stringToGMT(startTime),
      endTime: stringToGMT(endTime),
      ...rest,
    });
  }

  return (
    <div className="trip-modal">
      <Form
        layout="vertical"
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 900 }}
        disabled
        form={form}
      >
        <div className="flex gap-5">
          <div>
            <div className=" flex justify-center w-full gap-5">
              <Form.Item name="id" label="ID">
                <Input disabled style={{ width: "11.875rem" }} />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Input disabled style={{ width: "11.875rem" }} />
              </Form.Item>
            </div>
            <Form.Item name={"startTime"} label={"Start Time"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name={"startStationName"} label={"Start Station Name"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name={"passengerName"} label={"Passenger Name"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <a onClick={() => setUserId(userIdRef.current.passengerId)}>
              See more
            </a>
          </div>
          <div>
            <Form.Item name={"feedbackPoint"} label={"Feedback Point"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name={"endTime"} label={"End Time"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name={"endStationName"} label={"End Station Name"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name={"grabberName"} label={"Grabber Name"}>
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <a onClick={() => setUserId(userIdRef.current.grabberId)}>
              See more
            </a>
          </div>
        </div>
      </Form>
      <DetailDataModalContainer
        currentId={userId}
        itemList={[
          { id: userIdRef.current.grabberId },
          { id: userIdRef.current.passengerId },
        ]}
        setCurrentId={setUserId}
      >
        <DetailUserModalContainer disableAdmin={true} />
      </DetailDataModalContainer>
    </div>
  );
};

export default TripModal;
