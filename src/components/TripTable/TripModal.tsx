import { stringToGMT } from "@utils/datetime";
import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Trip } from "src/types/trip";
import {
  tripModalFormItemsRight,
  tripModalFormItemsLeft,
} from "./formMapItems";

const TripModal = ({ currentItem }: { currentItem?: Trip | null }) => {
  const [form] = Form.useForm();

  if (currentItem) {
    const { startTime, endTime, ...rest } = currentItem;

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
            {tripModalFormItemsLeft.map((formItem) => (
              <Form.Item
                name={formItem.name}
                label={formItem.label}
                key={formItem.name}
              >
                <Input style={{ width: "25rem" }} />
              </Form.Item>
            ))}
          </div>
          <div>
            {tripModalFormItemsRight.map((formItem) => (
              <Form.Item
                name={formItem.name}
                label={formItem.label}
                key={formItem.name}
              >
                <Input style={{ width: "25rem" }} />
              </Form.Item>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TripModal;
