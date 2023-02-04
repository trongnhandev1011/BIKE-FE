import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Station } from "src/types/station";

const StationModal = ({
  currentItem,
  isEdit,
  setIsEdit,
}: {
  currentItem?: Station | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="station-modal">
      <Form
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        disabled={!isEdit}
      >
        <Form.Item name="id" label="ID">
          <Input defaultValue={currentItem?.id} disabled />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input defaultValue={currentItem?.name} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input defaultValue={currentItem?.description} />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input defaultValue={currentItem?.address_string} />
        </Form.Item>
        <Form.Item name="longitude" label="Longitude">
          <Input defaultValue={currentItem?.longitude} />
        </Form.Item>
        <Form.Item name="latitude" label="Latitude">
          <Input defaultValue={currentItem?.latitude} />
        </Form.Item>
        <div className="flex justify-center">
          {isEdit ? (
            <Button
              className="mr-2"
              onClick={() => {
                if (setIsEdit) setIsEdit(false);
              }}
            >
              Save
            </Button>
          ) : null}
          <Button>Delete</Button>
        </div>
      </Form>
      {!isEdit ? (
        <Button
          className="mr-2"
          onClick={() => {
            if (setIsEdit) setIsEdit(true);
          }}
        >
          Edit
        </Button>
      ) : null}
    </div>
  );
};

export default StationModal;
