import { Form, Input, Avatar, Space, Button, Alert } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Vehicle } from "src/types/vehicle";
import { updateVehicleRequestStatusAPI } from "@services/backend/VehicleController";

const VehicleModal = ({
  currentItem,
  closeModalHandle,
}: {
  currentItem?: Vehicle | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  closeModalHandle?: Dispatch<void>;
}) => {
  const [apiError, setApiError] = useState<any>(false);

  const handleVehicleRequest = async (approval: boolean) => {
    try {
      const result = await updateVehicleRequestStatusAPI(currentItem?.id, {
        approved: approval,
      });

      if(closeModalHandle) closeModalHandle();
    } catch (e) {
      console.log(e);
      setApiError(e);
    }
  }

  return (
    <div className="vehicle-modal">
      <Form
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700 }}
        disabled
      >
        <Form.Item name="image" label="Image">
            <Avatar shape="square" size={256} src={currentItem?.image}/>
        </Form.Item>
        <Form.Item name="id" label="ID">
          <Input defaultValue={currentItem?.id} disabled />
        </Form.Item>
        <Form.Item name="brand" label="Vehicle Brand">
          <Input defaultValue={currentItem?.brand} />
        </Form.Item>
        <Form.Item name="licencePlate" label="Licence Plate">
          <Input defaultValue={currentItem?.licencePlate} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input defaultValue={currentItem?.description} />
        </Form.Item>
        <Form.Item name="type" label="Vehicle Type">
          <Input defaultValue={currentItem?.type} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Input defaultValue={currentItem?.status} />
        </Form.Item>
      </Form>
      {currentItem?.status=="WAITING" ? (
        <Space className="flex flex-row justify-center items-centerflex mt-5" wrap>
          <Button onClick={()=>handleVehicleRequest(true)} type="primary" ghost>
          Accept
          </Button>
          <Button onClick={()=>handleVehicleRequest(false)} type="primary" danger ghost>
          Reject
          </Button>
        </Space>
      ) : null}
      {
        apiError
        ? <Space className="flex flex-row justify-center items-centerflex mt-5" wrap>
            <Alert message="Action failed, please try again" type="error" showIcon />
          </Space>
        : null
      }     
    </div>
  );
};

export default VehicleModal;