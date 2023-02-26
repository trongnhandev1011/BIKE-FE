import { Form, Input, Avatar, Space, Button, Alert } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Vehicle } from "src/types/vehicle";
import { updateVehicleRequestStatusAPI } from "@services/backend/VehicleController";
import { pathToImgURL } from "@utils/image";

interface IVehicleModalProps {
  currentItem?: Vehicle | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  closeModalHandle?: Dispatch<void>;
}

const VehicleModal = ({
  currentItem,
  closeModalHandle,
}: IVehicleModalProps) => {
  const [apiError, setApiError] = useState<any>(false);
  const [form] = Form.useForm();

  form.setFieldsValue({ ...currentItem });

  const handleVehicleRequest = async (approval: boolean) => {
    try {
      const result = await updateVehicleRequestStatusAPI(currentItem?.id, {
        approved: approval,
      });

      if (closeModalHandle) closeModalHandle();
    } catch (e) {
      console.log(e);
      setApiError(e);
    }
  };

  return (
    <div className="vehicle-modal">
      <Form
        layout="vertical"
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700 }}
        disabled
        form={form}
      >
        <div className="flex gap-5 items-center">
          <Avatar
            shape="square"
            size={256}
            src={currentItem?.image && pathToImgURL(currentItem?.image)}
          />
          <div>
            <Form.Item name="id" label="ID">
              <Input disabled style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name="brand" label="Vehicle Brand">
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name="licencePlate" label="Licence Plate">
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name="type" label="Vehicle Type">
              <Input style={{ width: "25rem" }} />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Input style={{ width: "25rem" }} />
            </Form.Item>
          </div>
        </div>
      </Form>
      {currentItem?.status == "WAITING" ? (
        <Space
          className="flex flex-row justify-center items-centerflex mt-5"
          wrap
        >
          <Button
            onClick={() => handleVehicleRequest(true)}
            type="primary"
            ghost
          >
            Accept
          </Button>
          <Button
            onClick={() => handleVehicleRequest(false)}
            type="primary"
            danger
            ghost
          >
            Reject
          </Button>
        </Space>
      ) : null}
      {apiError ? (
        <Space
          className="flex flex-row justify-center items-centerflex mt-5"
          wrap
        >
          <Alert
            message="Action failed, please try again"
            type="error"
            showIcon
          />
        </Space>
      ) : null}
      {apiError ? (
        <Space
          className="flex flex-row justify-center items-centerflex mt-5"
          wrap
        >
          <Alert
            message="Action failed, please try again"
            type="error"
            showIcon
          />
        </Space>
      ) : null}
    </div>
  );
};

export default VehicleModal;
