import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;

