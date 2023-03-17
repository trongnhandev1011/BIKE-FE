import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Station } from "src/types/station";
import { Transfer } from "antd";
import type { TransferDirection, TransferListProps } from "antd/es/transfer";
import { stationModalFormItems } from "./formMapItems";
import { createStationAPI } from "@services/backend/StationController";
import type { StationFormFields } from "./formMapItems";
import StationFormValidation from "src/form/validation/stationFormValidation";

const onFinish = async (values: any, closeModal: any) => {
  try {
    const result = await createStationAPI({
      ...values,
    });
    if (result?.data?.code === 0) closeModal && closeModal();
  } catch (e) {
    console.error(e);
  }
};

const renderFooter = (
  setPageNumber: Dispatch<SetStateAction<number>>,
  direction?: TransferDirection
) => {
  return direction === "left" ? (
    <Button
      size="small"
      style={{ float: "right", margin: 5 }}
      onClick={() => {
        setPageNumber((prev) => prev + 1);
      }}
    >
      Load more
    </Button>
  ) : null;
};

const AddStationModal = ({
  stations,
  setPageNumber,
  closeModal,
}: {
  stations: any[];
  setPageNumber: Dispatch<SetStateAction<number>>;
  closeModal: any;
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="add-station-modal">
      <Form
        layout="vertical"
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 900 }}
        onFinish={(values) =>
          onFinish({ ...values, nextStationsIds: targetKeys }, closeModal)
        }
      >
        <div className="flex">
          <div>
            {stationModalFormItems?.map((formItem) => (
              <Form.Item
                name={formItem.name}
                label={formItem.label}
                key={formItem.name}
                rules={
                  StationFormValidation[formItem.name as StationFormFields]
                }
                className="content-center"
              >
                <Input
                  disabled={formItem?.disabled}
                  style={{ width: "25rem" }}
                />
              </Form.Item>
            ))}

            <div className=" flex justify-center w-full gap-5">
              <Form.Item
                name="longitude"
                label="Longitude"
                rules={StationFormValidation["longitude"]}
              >
                <Input style={{ width: "11.875rem" }} />
              </Form.Item>
              <Form.Item
                name="latitude"
                label="Latitude"
                rules={StationFormValidation["latitude"]}
              >
                <Input style={{ width: "11.875rem" }} />
              </Form.Item>
            </div>
          </div>
          <Transfer
            listStyle={{
              height: 280,
            }}
            className="flex justify-center m-5"
            dataSource={
              stations
                ?.filter((station) => station.status === "ACTIVE")
                .map((station) => ({
                  key: station.id.toString(),
                  title: station.name,
                  description: station.description,
                })) || []
            }
            titles={["Source", "Target"]}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={(nextTargetKeys: string[]) => {
              setTargetKeys(nextTargetKeys);
            }}
            onSelectChange={(
              sourceSelectedKeys: string[],
              targetSelectedKeys: string[]
            ) => {
              setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
            }}
            render={(item) => item.title}
            footer={(
              _: TransferListProps<any>,
              info?:
                | {
                    direction: TransferDirection;
                  }
                | undefined
            ) => renderFooter(setPageNumber, info?.direction) as any}
          />
        </div>
        <div className="flex justify-center mt-2">
          <Button className="mr-2" htmlType="submit">
            Save
          </Button>
          <Button>Reset</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddStationModal;
