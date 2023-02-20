import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import React from "react";

const AddDataModal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: any;
}) => {
  const closeModalHandle = () => {
    setIsOpen(false);
  };

  return (
    <div className="add-data-modal">
      <Modal
        destroyOnClose
        open={isOpen}
        onCancel={() => closeModalHandle()}
        footer={null}
      >
        {React.cloneElement(children, {})}
      </Modal>
    </div>
  );
};

export default AddDataModal;
