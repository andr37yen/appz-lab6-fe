import React, { useState } from "react";
import {
  IAppointment,
  INotification,
  IPrescription,
  NotificationType,
} from "../../../types/types";
import {
  getPrescriptionTimeLeft,
  getTimeLeft,
  isNotRejectoedOrExpired,
} from "../../../utils/timeHelper";
import Modal from "../../../components/Modal";
import NotificationEditForm from "./NotificationEditForm";

export interface NotificationItemProps {
  notification: INotification;
  onEdit: (updatedNotification: INotification) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onEdit,
  onDelete,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isArchived = !isNotRejectoedOrExpired(notification);
  const bgColor = isArchived
    ? "bg-gray-200"
    : notification.type === NotificationType.APPOINTMENT
    ? "bg-green-200"
    : "bg-yellow-200";

  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
      <div className="font-semibold">{notification.label}</div>
      <div className="text-sm">{notification.description}</div>
      <div className="text-sm">
        Type: <em>{notification.type.toUpperCase()}</em>
      </div>
      <div className="text-sm">
        Status: <em>{notification.status}</em>
      </div>
      <div className="text-sm">
        Doctor: {(notification as IAppointment).doctor}
      </div>
      {notification.type === NotificationType.APPOINTMENT && (
        <>
          <div className="text-sm text-gray-600">
            {notification.date.toLocaleDateString()} -{" "}
            {notification.date.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-600">
            {getTimeLeft(notification.date)}
          </div>
        </>
      )}

      {notification.type === NotificationType.PRESCRIPTION && (
        <>
          <div className="text-sm">
            Duration: {(notification as IPrescription).duration}
          </div>
          <div className="text-sm">
            Regularity: {(notification as IPrescription).regularity}
          </div>
          <div className="text-sm text-gray-600">
            {notification.date.toLocaleDateString()} -{" "}
            {notification.date.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-600">
            {getPrescriptionTimeLeft(
              notification.date,
              (notification as IPrescription).duration
            )}
          </div>
        </>
      )}

      <div className="flex justify-between mt-2">
        {!isArchived && (
          <>
            <button
              onClick={() => setModalOpen(true)}
              className="text-blue-500 hover:text-blue-700 text-sm">
              Edit
            </button>
          </>
        )}

        <button
          onClick={() => onDelete(notification.id)}
          className="text-red-500 hover:text-red-700 text-sm">
          Delete
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <NotificationEditForm
          onSubmit={onEdit}
          onClose={() => setModalOpen(false)}
          notification={notification}
        />
      </Modal>
    </div>
  );
};

export default NotificationItem;

