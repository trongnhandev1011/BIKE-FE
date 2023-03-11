import { Form, Input, Avatar, Space, Button, Alert } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { User } from "src/types/user";
import { updateAccountStatusAPI } from "@services/backend/AccountController";
import { pathToImgURL } from "@utils/image";

interface IUserModalProps {
  currentItem?: User | null;
  mutateModal?: Dispatch<void>;
  disableAdmin?: boolean;
}

const UserModal = ({
  currentItem,
  mutateModal,
  disableAdmin = false,
}: IUserModalProps) => {
  const isActive: boolean = currentItem?.status == "ACTIVE";
  const [apiError, setApiError] = useState<any>(false);
  const [form] = Form.useForm();

  form.setFieldsValue({ ...currentItem });

  const toggleAccountStatus = async () => {
    try {
      const newStatus = isActive ? "INACTIVE" : "ACTIVE";

      const result = await updateAccountStatusAPI(currentItem?.id, newStatus);
      if (mutateModal) mutateModal();
    } catch (e) {
      console.log(e);
      setApiError(e);
    }
  };

  return (
    <div className="user-modal">
      <Form
        layout="vertical"
        className="mt-5"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 900 }}
        disabled
        form={form}
      >
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center">
            <Space
              direction="vertical"
              size={16}
              className="flex flex-col justify-center items-center"
            >
              <div>Avatar</div>
              <Avatar
                shape="square"
                size={140}
                src={currentItem?.avatar && pathToImgURL(currentItem?.avatar)}
              />

              {currentItem?.card && (
                <div className=" w-full flex justify-center flex-col">
                  <div className="mx-auto mb-3">Student card</div>
                  <Avatar
                    shape="square"
                    src={pathToImgURL(currentItem?.card)}
                    alt="Student Card Image"
                    size={140}
                  />
                </div>
              )}
            </Space>
          </div>
          <div>
            <Form.Item name="id" label="ID">
              <Input
                defaultValue={currentItem?.id}
                disabled
                style={{ width: "25rem" }}
              />
            </Form.Item>
            <Form.Item name="email" label="Email Address">
              <Input
                defaultValue={currentItem?.email}
                style={{ width: "25rem" }}
              />
            </Form.Item>
            <Form.Item name="name" label="User's Name">
              <Input
                defaultValue={currentItem?.name}
                style={{ width: "25rem" }}
              />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input
                defaultValue={currentItem?.phone}
                style={{ width: "25rem" }}
              />
            </Form.Item>
            <Form.Item name="averagePoint" label="Feedback Point">
              <Input
                defaultValue={currentItem?.averagePoint}
                style={{ width: "25rem" }}
              />
            </Form.Item>
          </div>
        </div>
      </Form>

      {!disableAdmin && (
        <Space
          className="flex flex-row justify-center items-centerflex mt-5"
          wrap
        >
          <Button
            onClick={toggleAccountStatus}
            type="primary"
            danger={isActive}
            ghost
          >
            {isActive ? "Ban" : "Unban"}
          </Button>
        </Space>
      )}
      {apiError ? (
        <Space
          className="flex flex-row justify-center items-centerflex mt-5"
          wrap
        >
          <Alert
            message="Update failed, please try again"
            type="error"
            showIcon
          />
        </Space>
      ) : null}
    </div>
  );
};

export default UserModal;
