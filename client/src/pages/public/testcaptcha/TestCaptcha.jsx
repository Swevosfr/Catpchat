import React from "react";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Captcha from "../../../components/Captchat";

export default function TestCaptcha() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center z-50 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg">
          <Captcha />
        </div>
      </div>
    </ReactModal>
  );
}
