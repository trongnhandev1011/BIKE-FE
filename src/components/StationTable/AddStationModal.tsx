import { Form, Input, Button } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Station } from "src/types/station";
import { Transfer } from "antd";
import type { TransferDirection, TransferListProps } from "antd/es/transfer";
import { addStationFormItems } from "./formMapItems";
import { createStationAPI } from "@services/backend/StationController";
import type { StationFormFields } from "./formMapItems";
import StationFormValidation from "src/form/validation/stationFormValidation";

const onFinish = async (values: any) => {
  try {
    const result = await createStationAPI({
      ...values,
    });
  } catch (e) {
    console.log(e);
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
}: {
  stations: any[];
  setPageNumber: Dispatch<SetStateAction<number>>;
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="add-station-modal">
      <Form
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={(values) =>
          onFinish({ ...values, nextStationsIds: targetKeys })
        }
      >
        {addStationFormItems.map((formItem) => (
          <Form.Item
            name={formItem.name}
            label={formItem.label}
            key={formItem.name}
            rules={StationFormValidation[formItem.name as StationFormFields]}
          >
            <Input />
          </Form.Item>
        ))}
        <Transfer
          className="flex justify-center"
          dataSource={
            stations.map((station) => ({
              key: station.id,
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
