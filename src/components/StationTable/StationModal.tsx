import { Form, Input, Button, Transfer } from "antd";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Station } from "src/types/station";
import type { TransferDirection, TransferListProps } from "antd/es/transfer";
import { editStationAPI } from "@services/backend/StationController";
import { stationModalFormItems } from "./formMapItems";
import StationFormValidation from "src/form/validation/stationFormValidation";
import type { StationFormFields } from "./formMapItems";

const onFinish = async (
  values: any,
  setIsEdit?: Dispatch<SetStateAction<boolean>>
) => {
  const { id, targetKeys, ...rest } = values;

  try {
    const result = await editStationAPI(values.id, {
      ...rest,
      nextStationIds: targetKeys,
    });
    if (setIsEdit) setIsEdit(false);
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

const StationModal = ({
  currentItem,
  isEdit,
  setIsEdit,
  stations,
  setPageNumber,
  nextStations,
}: {
  currentItem?: Station | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  stations?: Station[];
  setPageNumber: Dispatch<SetStateAction<number>>;
  nextStations?: Station[];
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setTargetKeys(
      nextStations?.map((nextStation) => nextStation?.id.toString()) || []
    );
  }, [nextStations]);

  return (
    <div className="station-modal">
      <Form
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        disabled={!isEdit}
        onFinish={(values) => onFinish({ ...values, targetKeys }, setIsEdit)}
        initialValues={{
          ...currentItem,
        }}
      >
        {stationModalFormItems.map((formItem) => (
          <Form.Item
            name={formItem.name}
            label={formItem.label}
            key={formItem.name}
            rules={StationFormValidation[formItem.name as StationFormFields]}
          >
            <Input disabled={formItem?.disabled} />
          </Form.Item>
        ))}
        <Transfer
          disabled={!isEdit}
          className="flex justify-center"
          dataSource={
            stations?.map((station) => ({
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
        <div className="flex justify-center">
          {isEdit ? (
            <Button className="mr-2" htmlType="submit">
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
