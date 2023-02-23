import { stringToGMT } from "@utils/datetime";
import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Trip } from "src/types/trip";
import { tripModalFormItems } from "./formMapItems";

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
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        disabled
        form={form}
      >
        {tripModalFormItems.map((formItem) => (
          <Form.Item
            name={formItem.name}
            label={formItem.label}
            key={formItem.name}
          >
            <Input />
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default TripModal;
