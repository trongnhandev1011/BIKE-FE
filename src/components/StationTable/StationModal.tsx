import { Form, Input, Button, Transfer } from "antd";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Station } from "src/types/station";
import type { TransferDirection, TransferListProps } from "antd/es/transfer";
import {
  editStationAPI,
  setStationStatusAPI,
} from "@services/backend/StationController";
import { stationModalFormItems } from "./formMapItems";
import StationFormValidation from "src/form/validation/stationFormValidation";
import type { StationFormFields } from "./formMapItems";

const onFinish = async (
  values: any,
  refreshModal?: any,
  refreshTable?: any,
  setIsEdit?: Dispatch<SetStateAction<boolean>>
) => {
  const { id, targetKeys, status, ...rest } = values;

  try {
    const result = await editStationAPI(values.id, {
      ...rest,
      nextStationIds: targetKeys,
    });
    if (setIsEdit) setIsEdit(false);
    if (refreshModal) refreshModal();
    if (refreshTable) refreshTable();
  } catch (e) {
    console.error(e);
  }
};

const renderFooter = (
  setPageNumber?: Dispatch<SetStateAction<number>>,
  direction?: TransferDirection
) => {
  return direction === "left" ? (
    <Button
      size="small"
      style={{ float: "right", margin: 5 }}
      onClick={() => {
        if (setPageNumber) setPageNumber((prev) => prev + 1);
      }}
    >
      Load more
    </Button>
  ) : null;
};

const changeStationStatus = async (
  curentItem: Station,
  refreshModal?: any,
  refreshTable?: any
) => {
  const result = await setStationStatusAPI(
    curentItem.id,
    curentItem.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
  );
  if (refreshModal) refreshModal();
  if (refreshTable) refreshTable();
};

interface IStationModalProps {
  currentItem?: Station | null;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  stations?: Station[];
  setPageNumber?: Dispatch<SetStateAction<number>>;
  refreshModal?: any;
  refreshTable?: any;
}

const StationModal = ({
  currentItem,
  isEdit,
  setIsEdit,
  stations,
  setPageNumber,
  refreshModal,
  refreshTable,
}: IStationModalProps) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  form.setFieldsValue({ ...currentItem });

  useEffect(() => {
    setTargetKeys(
      currentItem?.nextStations?.map((nextStation) =>
        nextStation?.id.toString()
      ) || []
    );
  }, [currentItem]);

  return (
    <div className="station-modal">
      <Form
        className="mt-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        disabled={!isEdit}
        onFinish={(values) =>
          onFinish(
            { ...values, targetKeys },
            refreshModal,
            refreshTable,
            setIsEdit
          )
        }
        initialValues={{
          ...currentItem,
        }}
        form={form}
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
            stations
              ?.filter(
                (station) =>
                  station.status === "ACTIVE" && station.id !== currentItem?.id
              )
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
        {isEdit ? (
          <div className="flex justify-center">
            <Button htmlType="submit">Save</Button>
          </div>
        ) : null}
      </Form>
      <div className="flex justify-center mt-2">
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

        <Button
          onClick={() =>
            currentItem &&
            changeStationStatus(currentItem, refreshModal, refreshTable)
          }
          type="primary"
          danger={currentItem?.status === "ACTIVE"}
        >
          {currentItem?.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
};

export default StationModal;
