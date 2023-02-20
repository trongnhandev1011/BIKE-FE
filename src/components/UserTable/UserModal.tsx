import { Form, Input, Avatar, Space, Button, Alert } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { User } from "src/types/user";
import { updateAccountStatusAPI } from "@services/backend/AccountController";

const UserModal = ({
  currentItem,
  closeModalHandle,
}: {
  currentItem?: User | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  closeModalHandle?: Dispatch<void>;
}) => {
  const isActive:boolean = currentItem?.status=="ACTIVE";
  const [apiError, setApiError] = useState<any>(false);

  const toggleAccountStatus = async () => {
    try {
      const newStatus = isActive ? "INACTIVE" : "ACTIVE";

      const result = await updateAccountStatusAPI(currentItem?.id, newStatus);
      if(closeModalHandle) closeModalHandle();
    } catch (e) {
      console.log(e);
      setApiError(e);
    }
  }

  return (
    <div className="user-modal">
        <Space direction="vertical" size={16} className="flex flex-col justify-center items-center mt-5">
            <Avatar shape="square" size={125} src={currentItem?.avatar}/>
        </Space>
      <Form
        className="mt-5"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        disabled
      >
        <Form.Item name="id" label="ID">
          <Input defaultValue={currentItem?.id} disabled />
        </Form.Item>
        <Form.Item name="email" label="Email Address">
          <Input defaultValue={currentItem?.email} />
        </Form.Item>
        <Form.Item name="name" label="User's Name">
          <Input defaultValue={currentItem?.name} />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input defaultValue={currentItem?.phone} />
        </Form.Item>
        <Form.Item name="card" label="Student Card">
          {
            currentItem?.card
            ? <Image src={currentItem?.card} alt="Student Card Image" width="100%" height="100%" layout="responsive" objectFit="contain"/>
            : <Input defaultValue="" />
          }
        </Form.Item>
        <Form.Item name="averagePoint" label="Feedback Point">
          <Input defaultValue={currentItem?.averagePoint} />
        </Form.Item>
      </Form>

      <Space className="flex flex-row justify-center items-centerflex mt-5" wrap>
          <Button onClick={toggleAccountStatus} type="primary" danger={isActive} ghost>
            {isActive ? "Ban" : "Unban"}
          </Button>
      </Space>
      {
        apiError
        ? <Space className="flex flex-row justify-center items-centerflex mt-5" wrap>
            <Alert message="Update failed, please try again" type="error" showIcon />
          </Space>
        : null
      }     
    </div>
  );
};

export default UserModal;