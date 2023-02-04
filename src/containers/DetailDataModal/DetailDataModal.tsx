import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import React from "react";

const DetailDataModal = ({
  currentId,
  itemList,
  setCurrentId,
  children,
}: {
  currentId: number;
  itemList: any;
  setCurrentId: Dispatch<SetStateAction<number>>;
  children?: any;
}) => {
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const closeModalHandle = () => {
    setCurrentId(0);
    setIsEdit(false);
  };

  useEffect(() => {
    if (itemList) {
      setCurrentItem(itemList.filter((item: any) => item.id === currentId)[0]);
    }
  }, [currentId]);

  return (
    <div className="detail-data-modal">
      <Modal
        destroyOnClose
        open={currentId !== 0}
        onCancel={() => closeModalHandle()}
        footer={null}
      >
        {React.cloneElement(children, {
          currentItem: currentItem,
          isEdit: isEdit,
          setIsEdit: setIsEdit,
        })}
      </Modal>
    </div>
  );
};

export default DetailDataModal;
